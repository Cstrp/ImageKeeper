import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggerErrorInterceptor } from 'nestjs-pino';

export const appConfig = (app: INestApplication) => {
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
};
