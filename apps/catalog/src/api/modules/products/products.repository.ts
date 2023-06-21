import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { IDataServices, Product } from '@app/db-lib';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsRepository {
  constructor(private readonly db: IDataServices) {}

  public async create(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.db.products.create({
      id: v4(),
      ...createProductInput,
    });
  }

  public async getAll(): Promise<Product[]> {
    return await this.db.products.getAll();
  }

  public async getOne(id: string): Promise<Product> {
    const product = await this.db.products.findOneByParameters({ id });

    if (!product) {
      throw new HttpException(
        `Product with such id(${id}) does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  public async getOneByObjectId(id: string): Promise<Product> {
    const product = await this.db.products.findOneByParameters({ _id: id });

    if (!product) {
      throw new HttpException(
        `Product with such objId(${id}) does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  public async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.db.products.update({ id }, updateProductInput);

    return this.getOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.db.products.deleteOne({ id });
  }
}
