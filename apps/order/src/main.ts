import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { WinstonLoggerService, AllExceptionsFilter } from '@app/common';

import { AppCartModule } from 'apps/cart/src/api/app-cart.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppCartModule, {
    cors: true,
  });

  const loggerService: WinstonLoggerService = app.get(WinstonLoggerService);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  await app.listen(3005);
}
bootstrap();
