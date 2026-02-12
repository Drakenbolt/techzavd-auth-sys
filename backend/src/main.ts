import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dns from 'dns';

async function bootstrap() {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));

  app.enableCors();
  await app.listen(3000);
  //await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
