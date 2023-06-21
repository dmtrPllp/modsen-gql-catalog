import { Module } from '@nestjs/common';

import { DataServiceModule } from '@app/db-lib';

import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [DataServiceModule],
  providers: [ProductsResolver, ProductsService, ProductsRepository],
})
export class ProductsModule {}
