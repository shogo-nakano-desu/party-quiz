import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`application is listening on port: ${process.env.PORT}`);
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
