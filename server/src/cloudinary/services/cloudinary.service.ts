import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class CloudinaryService {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}
  private cloudinary = v2;

  public async upload(path: string) {
    try {
      return this.cloudinary.uploader.upload(path, {
        use_filename: true,
        colors: true,
      });
    } catch (error) {
      this.logger.error('Failed to upload file', error);
    }
  }

  public async destroy(pubID: string) {
    return await this.cloudinary.uploader.destroy(pubID);
  }
}
