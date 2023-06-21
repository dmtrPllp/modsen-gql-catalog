import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IDataServices } from '../contracts/data-service.contract';
import { IGenericRepository } from '../contracts/generic-repository.contract';
import { Cart, CartDocument } from './model/cart.model';
import { Order, OrderDocument } from './model/order.model';
import { Product, ProductDocument } from './model/product.model';
import { User, UserDocument } from './model/user.model';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {
  users: IGenericRepository<User>;
  products: IGenericRepository<Product>;
  cart: IGenericRepository<Cart>;
  orders: IGenericRepository<Order>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>,
    @InjectModel(Product.name)
    private ProductRepository: Model<ProductDocument>,
    @InjectModel(Cart.name) private CartRepository: Model<CartDocument>,
    @InjectModel(Order.name) private OrderRepository: Model<OrderDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<UserDocument>(
      this.UserRepository,
      [],
    );
    this.products = new MongoGenericRepository<ProductDocument>(
      this.ProductRepository,
    );
    this.cart = new MongoGenericRepository<CartDocument>(this.CartRepository, [
      'userId',
      'products',
    ]);
    this.orders = new MongoGenericRepository<OrderDocument>(
      this.OrderRepository,
      ['userId', 'products'],
    );
  }
}
