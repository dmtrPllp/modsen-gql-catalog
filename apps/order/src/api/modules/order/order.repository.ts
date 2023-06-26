import { IDataServices, Product } from '@app/db-lib';
import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { v4 } from 'uuid';

@Injectable()
export class OrderRepository {
  constructor(private readonly db: IDataServices) {}

  public async create(createOrderInput: CreateOrderInput) {
    //TODO Messagebroker
    const cart = await this.db.cart.findOneByParameters({
      userId: createOrderInput.userId,
    });

    const products: Product[] = [];

    cart.products.forEach(async (item) => {
      products.push(await this.db.products.findOneByParameters({ _id: item }));
    });

    //TODO Messagebroker
    await this.db.cart.update({ userId: cart.userId }, { products: [] });

    return await this.db.orders.create({
      id: v4(),
      ...createOrderInput,
      products,
      orderDate: new Date().toISOString(),
    });
  }
}
