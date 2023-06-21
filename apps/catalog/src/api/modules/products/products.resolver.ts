import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  ADMIN,
  JwtAuthGuard,
  NoDataResponse,
  RoleGuard,
  Roles,
} from '@app/common';
import { Product } from '@app/db-lib';

import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import {
  CREATE_INPUT,
  GET_INPUT,
  ID_INPUT,
  UPDATE_INPUT,
} from './constants/params';
import { GetProductInput } from './dto/get-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Product)
  public createProduct(
    @Args(CREATE_INPUT) createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  public getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Query(() => Product, { name: 'product' })
  public getProductById(
    @Args(GET_INPUT) getProductInput: GetProductInput,
  ): Promise<Product> {
    return this.productsService.getOne(getProductInput);
  }

  @Roles(ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Product)
  public updateProduct(
    @Args(UPDATE_INPUT) updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Roles(ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => NoDataResponse)
  public removeProduct(@Args(ID_INPUT) id: string): Promise<NoDataResponse> {
    return this.productsService.remove(id);
  }
}
