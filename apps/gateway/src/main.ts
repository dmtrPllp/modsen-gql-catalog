import { NestFactory } from '@nestjs/core';

import { config } from 'dotenv';

import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  await app.listen(3002);
}
config();
bootstrap();
