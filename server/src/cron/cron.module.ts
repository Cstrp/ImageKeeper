import { Module } from '@nestjs/common';
import { CronService } from './services';

@Module({
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
