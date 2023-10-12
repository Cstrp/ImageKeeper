import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import { ImageService } from '../../images/services';

@Injectable()
export class CronService {
  constructor(private readonly imageService: ImageService) {}

  @Cron('0 0 7 * * *')
  public cleanupImages() {
    this.cleanup();
  }

  private cleanup() {
    const uploadDir = 'uploads/';
    const files = fs.readdirSync(uploadDir, { recursive: true });
    const isUploaded = this.imageService.isUploaded;

    if (fs.existsSync(uploadDir) && files.length && isUploaded) {
      for (const file of files) {
        fs.unlinkSync(uploadDir + file);
      }
    }

    console.log('Cron job cleanup complete!');
  }
}
