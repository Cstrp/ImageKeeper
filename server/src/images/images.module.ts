import { Module } from '@nestjs/common';
import { ImageService } from './services';
import { ImageController } from './controllers';
import { CloudinaryModule } from '../cloudinary';

@Module({
  imports: [CloudinaryModule],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImagesModule {}
