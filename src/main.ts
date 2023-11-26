import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Techconecta')
    .setDescription('API para projeto da disciplina Desenvolvimento WEB 2, do curso de ADS do IFPE Campus Jaboatão')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)
  await app.listen(3000);
}
bootstrap();
