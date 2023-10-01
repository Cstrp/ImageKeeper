import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multerConfig';

@Controller('')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getAllImages() {
    return await this.imageService.getImages();
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  public async upload(
    @UploadedFile() image: Express.Multer.File,
    @Body('label') label: string,
  ) {
    return await this.imageService.uploadImages(image, label);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  public async updateImage(
    @Param('id') id: string,
    @Body('label') label: string,
  ) {
    return await this.imageService.updateImage(id, label);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteImage(@Param('id') id: string) {
    return await this.imageService.deleteImage(id);
  }
}
