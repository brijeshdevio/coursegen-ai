import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { env } from './config';
import { GlobalExceptionFilter } from './common/filters';

const PORT = Number(env?.PORT) || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: env?.CLIENT_URL,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log(
      `Application is running on port ${PORT} - http://localhost:${PORT}`,
    );
  })
  .catch((error) => {
    console.error('Error starting application:', error);
  });
