import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 8000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('nestjs back-end')
    .setDescription('Rest API documentation')
    .setVersion('1.0.0')
    .addTag('Egor Pobylets')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log('START !!!' + PORT));
}

bootstrap();
