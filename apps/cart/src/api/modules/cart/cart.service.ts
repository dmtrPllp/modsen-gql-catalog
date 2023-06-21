import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Cart } from '@app/db-lib';

import { CartRepository } from './cart.repository';
import { NOT_FOUND } from '@app/common';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async create(userId: string): Promise<Cart> {
    return await this.cartRepository.create(userId);
  }

  public async getOne(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.getOne(userId);

    if (!cart) {
      throw new HttpException(NOT_FOUND('Cart'), HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  public async update(userId: string, productId: string) {
    const cart = await this.getOne(userId);

    if (!cart) {
      throw new HttpException(NOT_FOUND('Cart'), HttpStatus.NOT_FOUND);
    }

    return await this.cartRepository.update(cart, productId);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
