import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AllExceptionsFilter, WinstonLoggerService } from '@app/common';

import { AuthAppModule } from './api/app-auth.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AuthAppModule, {
    cors: true,
  });

  const loggerService: WinstonLoggerService = app.get(WinstonLoggerService);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  await app.listen(3000);
}
bootstrap();
