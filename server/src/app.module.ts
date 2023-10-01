import { Module } from '@nestjs/common';
import { CronModule } from './cron';
import { DatabaseModule } from './database';
import { ImagesModule } from './images';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './config';

@Module({
  imports: [
    CronModule,
    ImagesModule,
    DatabaseModule,
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
