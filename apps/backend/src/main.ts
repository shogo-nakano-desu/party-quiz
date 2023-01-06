import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT_NUMBER = 3010;
  const app = await NestFactory.create(AppModule);
  console.log(`application is listening on port: ${PORT_NUMBER}`);
  await app.listen(PORT_NUMBER, '0.0.0.0');
}
bootstrap();
