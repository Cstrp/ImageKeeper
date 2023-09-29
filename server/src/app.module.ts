import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary';
import { CronModule } from './cron';
import { ImagesModule } from './images';
import { DatabaseModule } from './database';

@Module({
  imports: [CloudinaryModule, CronModule, ImagesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
