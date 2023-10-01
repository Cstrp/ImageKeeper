import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/services/database.service';
import { CloudinaryService } from '../../cloudinary/services';

@Injectable()
export class ImageService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly cloudService: CloudinaryService,
  ) {}

  public async getImages() {
    return await this.dbService.image.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  public async getImage(id: string) {
    return await this.dbService.image.findFirst({ where: { id } });
  }

  public async uploadImages(image: Express.Multer.File, label: string) {
    const result = await this.cloudService.upload(image.path);

    if (result) {
      const { secure_url: url, public_id } = result;

      return await this.dbService.image.create({
        data: { url, public_id, label },
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
