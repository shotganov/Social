import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(process.cwd(), 'public');

  app.useStaticAssets(publicPath, {
    prefix: '/public/',
  });

  app.enableCors({
    origin: [
      'http://127.0.0.1:5501',
      'http://localhost:5501',
      'http://172.18.0.1:5173',
      'http://192.168.56.1:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Server running on http://localhost:3000/api');
}

bootstrap();
