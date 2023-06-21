import { IDataServices } from '@app/db-lib';
import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrderRepository {
  constructor(private readonly db: IDataServices) {}

  public async create(createOrderInput: CreateOrderInput) {
    //TODO Messagebroker
    const cart = await this.db.cart.findOneByParameters({
      userId: createOrderInput.userId,
    });

    const products = cart.products;

    //TODO Messagebroker
    await this.db.cart.update({ userId: cart.userId }, { products: [] });

    return await this.db.orders.create({ ...createOrderInput, products, });
  }
}
