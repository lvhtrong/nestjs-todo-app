import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './database';

require('dotenv-flow').config();

async function bootstrap() {
  await initDatabase();
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
