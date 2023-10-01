import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'Cloudinary',
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    v2.config({
      cloud_name: config.get('CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    }),
};
