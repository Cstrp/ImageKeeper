import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class CronService {
  @Cron('0 3 * * * *')
  public cleanupImages() {
    this.cleanup();
  }

  private cleanup() {
    const uploadDir = 'uploads/';
    const files = fs.readdirSync(uploadDir, { recursive: true });

    if (fs.existsSync(uploadDir) && files.length) {
      for (const file of files) {
        fs.unlinkSync(uploadDir + file);
      }
    }

    console.log('Cron job cleanup complete!');
  }
}
