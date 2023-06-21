import { IGenericRepository } from './generic-repository.contract';
import { Cart } from '../mongo/model/cart.model';
import { Order } from '../mongo/model/order.model';
import { Product } from '../mongo/model/product.model';
import { User } from '../mongo/model/user.model';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;

  abstract products: IGenericRepository<Product>;

  abstract cart: IGenericRepository<Cart>;

  abstract orders: IGenericRepository<Order>;
}
