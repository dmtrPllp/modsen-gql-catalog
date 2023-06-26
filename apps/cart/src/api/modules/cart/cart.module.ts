import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartRepository } from './cart.repository';
import { DataServiceModule } from '@app/db-lib';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    DataServiceModule,
    RmqModule.registerRmq(
      'PRODUCT_SERVICE',
      process.env.RABBITMQ_PRODUCT_QUEUE,
    ),
  ],
  providers: [CartResolver, CartService, CartRepository],
})
export class CartModule {}
