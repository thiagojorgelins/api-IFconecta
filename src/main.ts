import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.useStaticAssets(join(__dirname, '..', 'public'))
  // rota das imagens
  // http://localhost:3000/post/images/nome da imagem

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  const config = new DocumentBuilder()
    .setTitle('API Techconecta')
    .setDescription('API para projeto da disciplina Desenvolvimento WEB 2, do curso de ADS do IFPE Campus Jaboatão')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)
  await app.listen(3000)
}
bootstrap();
