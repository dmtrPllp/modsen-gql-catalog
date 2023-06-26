import { ClientProxy } from '@nestjs/microservices';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { v4 } from 'uuid';
import { firstValueFrom } from 'rxjs';

import { NOT_FOUND } from '@app/common';
import { Cart, IDataServices, Product } from '@app/db-lib';

@Injectable()
export class CartRepository {
  constructor(
    private readonly db: IDataServices,
    @Inject('ELASTIC_SEARCH_SERVICE')
    private readonly productService: ClientProxy,
  ) {}

  public async create(userId: string): Promise<Cart> {
    return await this.db.cart.create({ id: v4(), userId });
  }

  public async getOne(userId: string): Promise<Cart> {
    return await this.db.cart.findOneByParameters({ userId });
  }

  public async update(cart: Cart, productId: string): Promise<Cart> {
    const product = await firstValueFrom(
      this.productService.send<Product, string>(
        { cmd: 'get-product-by-id' },
        productId,
      ),
    );

    console.log(product);

    if (!product) {
      throw new HttpException(NOT_FOUND('Product'), HttpStatus.NOT_FOUND);
    }

    cart.products.push(product);

    return await this.db.cart.update(
      { userId: cart.userId },
      { products: cart.products },
    );
  }
}
