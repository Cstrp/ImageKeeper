import { Module } from '@nestjs/common';
import { CronService } from './services';
import { ImagesModule } from '../images';

@Module({
  imports: [ImagesModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
