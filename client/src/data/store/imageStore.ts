import { action, makeAutoObservable, observable } from 'mobx';
import { removeImage } from '../api/removeImage';
import { updateImage } from '../api/updateImage';
import { uploadImage } from '../api/uploadImage';
import { Image } from '../types';
import { groupImage } from '../utils';

class ImageStore {
  public images: Record<string, Image[]> = {};

  constructor() {
    makeAutoObservable(this, {
      images: observable,
      setImages: action,
      getImages: observable,
      addImage: action,
      removeImage: action,
      updateLabel: action,
    });
  }

  public setImages(images: Image[]) {
    const groupedImages = groupImage(images);
    this.images = groupedImages;
  }

  public getImages(): Record<string, Image[]> {
    return this.images;
  }

  public getImagasLength(): number {
    return Object.values(this.images).reduce(
      (acc, imageGroup) => acc + imageGroup.length,
      0,
    );
  }

  public async addImage(image: File | null) {
    if (!image) return;

    const uploadedImage = await uploadImage(image);
    const updatedImages: Record<string, Image[]> = {};

    Object.keys(this.images).forEach((date) => {
      const newImage: Image = {
        ...uploadedImage,
        preview: image.name,
        progress: 0,
      };

      updatedImages[date] = [newImage!, ...this.images[date]];
    });

    this.images = updatedImages;
  }

  public async removeImage(image_id: string) {
    const updatedImages: Record<string, Image[]> = {};

    Object.keys(this.images).forEach((date) => {
      updatedImages[date] = this.images[date].filter(
        (image) => image.id !== image_id,
      );
    });

    this.images = updatedImages;
    await removeImage(image_id);
  }

  public async updateLabel(image_id: string, label: string) {
    const updatedImages: Record<string, Image[]> = {};

    Object.keys(this.images).forEach((date) => {
      updatedImages[date] = this.images[date].map((image) => {
        if (image.id === image_id) {
          return { ...image, label };
        }
        return image;
      });
    });

    await updateImage(image_id, label);
    this.images = updatedImages;
  }
}

export const imageStore = new ImageStore();
