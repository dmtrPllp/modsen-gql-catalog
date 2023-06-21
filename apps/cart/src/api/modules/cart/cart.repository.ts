import { NOT_FOUND } from '@app/common';
import { Cart, IDataServices } from '@app/db-lib';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository {
  constructor(private readonly db: IDataServices) {}

  public async create(userId: string): Promise<Cart> {
    return await this.db.cart.create({ userId });
  }

  public async getOne(userId: string): Promise<Cart> {
    return await this.db.cart.findOneByParameters({ userId });
  }

  public async update(cart: Cart, productId: string): Promise<Cart> {
    const product = await this.db.products.findOneByParameters({
      id: productId,
    });

    if (!product) {
      throw new HttpException(NOT_FOUND('Product'), HttpStatus.NOT_FOUND);
    }

    cart.products.push(product._id);
    return await this.db.cart.update(
      { userId: cart.userId },
      { products: cart.products },
    );
  }
}
