import { BadRequestException, Injectable } from '@nestjs/common';

import { Product } from '@app/db-lib';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsRepository } from './products.repository';
import { NoDataResponse } from '@app/common';
import { GetProductInput } from './dto/get-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async create(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productsRepository.create(createProductInput);
  }

  public async getAll(): Promise<Product[]> {
    return await this.productsRepository.getAll();
  }

  public async getOne(getProductInput: GetProductInput): Promise<Product> {
    if (Object.keys(getProductInput).length === 1) {
      if (getProductInput.productId) {
        return await this.productsRepository.getOne(getProductInput.productId);
      } else if (getProductInput.objectId) {
        return await this.productsRepository.getOneByObjectId(
          getProductInput.objectId,
        );
      }
    } else {
      throw new BadRequestException('Invalid params number');
    }
  }

  public async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.productsRepository.getOne(id);

    return await this.productsRepository.update(id, updateProductInput);
  }

  public async getAllByCart(cartProducts: Product[]) {
    console.log(cartProducts);
    return cartProducts;
  }

  public async remove(id: string): Promise<NoDataResponse> {
    this.productsRepository.getOne(id);

    await this.productsRepository.remove(id);

    return { message: 'Product removed successfully.' };
  }
}
