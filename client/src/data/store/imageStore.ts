import { removeImage, updateImage, uploadImage } from '../api';
import { makeAutoObservable, runInAction } from 'mobx';
import { getBase64, groupImage, notify } from '../utils';
import { Image } from '../types';
import moment from 'moment';

export class ImageStore {
  constructor() {
    makeAutoObservable(this);
  }

  public images: Record<string, Image[]> = {};
  public uploading: boolean = false;
  public progress: number = 0;

  private uploadProgress: string = '';

  public setImages(images: Image[]) {
    const groupedImages = groupImage(images);
    this.updateState(groupedImages);
  }

  public getImages = (): Record<string, Image[]> => {
    return this.images;
  };

  public getImagesLength = (): number =>
    Object.values(this.images).reduce(
      (acc, imageGroup) => acc + imageGroup.length,
      0,
    );

  public getUploadProgress = (): string => {
    return this.uploadProgress;
  };

  public async addImage(image: File | null) {
    try {
      if (!image) return;
      const updatedImages: Record<string, Image[]> = { ...this.images };
      const preview = await getBase64(image);
      const key = moment().format("MMMM ' D");

      updatedImages[key] = [
        ...(updatedImages[key] || []),
        {
          preview,
          upload: this.uploading,
        },
      ];

      this.updateState(updatedImages);

      const uploadedImage = await uploadImage(image, (progress) => {
        this.updateProgress(true);

        if (progress.total && progress.loaded && progress.upload) {
          const total = Math.round(progress.total / 1024);
          const loaded = Math.round(progress.loaded / 1024);

          runInAction(() => {
            this.progress = Math.round((loaded / total) * 100);
          });

          runInAction(() => {
            this.uploadProgress = this.setUploadProgress(loaded, total);
          });
        }
      });

      this.updateProgress(false);

      if (updatedImages[key]) {
        updatedImages[key].pop();
      }

      updatedImages[key] = [
        {
          ...uploadedImage,
          upload: this.uploading,
        },
        ...(updatedImages[key] || []),
      ];

      this.updateState(updatedImages);
    } catch (error) {
      console.error(error);
      notify({
        type: 'error',
        message: 'Error while adding image.',
        description: 'Failed to add image. Please try again.',
      });
    }
  }

  public async removeImage(image_id: string) {
    const updatedImages: Record<string, Image[]> = { ...this.images };

    Object.keys(this.images).forEach((date) => {
      updatedImages[date] = this.images[date].filter(
        (image) => image.id !== image_id,
      );
    });

    this.updateState(updatedImages);
    await removeImage(image_id);
  }

  public async updateLabel(image_id: string, label: string) {
    const updatedImages: Record<string, Image[]> = { ...this.images };

    Object.keys(this.images).forEach((date) => {
      updatedImages[date] = this.images[date].map((image) => {
        if (image.id === image_id) {
          return { ...image, label };
        }
        return image;
      });
    });

    this.updateState(updatedImages);
    await updateImage(image_id, label);
  }

  private updateProgress(isLoading: boolean) {
    runInAction(() => {
      this.uploading = isLoading;
    });
  }

  private setUploadProgress(loaded: number, total: number) {
    return `${Math.round((loaded / total) * total)} of ${total}kb`;
  }

  private updateState(updatedImages: Record<string, Image[]>) {
    runInAction(() => {
      this.images = updatedImages;
    });
  }
}

export const imageStore = new ImageStore();
