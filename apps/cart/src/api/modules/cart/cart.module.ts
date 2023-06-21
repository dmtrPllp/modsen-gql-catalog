import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartRepository } from './cart.repository';
import { DataServiceModule } from '@app/db-lib';

@Module({
  imports: [DataServiceModule],
  providers: [CartResolver, CartService, CartRepository],
})
export class CartModule {}
