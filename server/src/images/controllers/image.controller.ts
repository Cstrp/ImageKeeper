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
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { multerConfig } from '../../config/multerConfig';
import { ImageService } from '../services';
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
  public async upload(@Req() req: Request) {
    return await this.imageService.uploadImages(req.file!);
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
