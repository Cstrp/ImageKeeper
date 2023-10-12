import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/services';
import { DatabaseService } from '../../database/services';

@Injectable()
export class ImageService {
  public isUploaded: boolean = false;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly cloudService: CloudinaryService,
  ) {}

  public async getImages() {
    return await this.dbService.image.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  public async uploadImages(image: Express.Multer.File) {
    const result = await this.cloudService.upload(image.path);

    if (result) {
      this.isUploaded = true;
      const { secure_url: url, public_id } = result;
      return await this.dbService.image.create({
        data: { url, public_id },
      });
    }
  }

  public async updateImage(id: string, label: string) {
    return await this.dbService.image.update({
      where: { id },
      data: { label },
    });
  }

  public async deleteImage(public_id: string) {
    const image = await this.dbService.image.findUnique({
      where: { id: public_id },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${public_id} not found.`);
    }

    await this.cloudService.destroy(image.public_id);
    await this.dbService.image.delete({ where: { id: public_id } });
  }
}
