import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(Number(process.env.PORT) || 3000, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
  });
}

bootstrap();
