import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AllExceptionsFilter, WinstonLoggerService } from '@app/common';

import { AppCatalogModule } from './api/app-catalog.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppCatalogModule,
    {
      cors: true,
    },
  );

  const loggerService: WinstonLoggerService = app.get(WinstonLoggerService);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  await app.listen(3003);
}
bootstrap();
