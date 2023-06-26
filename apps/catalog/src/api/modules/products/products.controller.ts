import { RmqService } from '@app/common';
import { ProductsService } from './products.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { Product } from '@app/db-lib';

export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'get-product-by-id' })
  public async getProductById(
    @Ctx() context: RmqContext,
    @Payload() payload: string,
  ): Promise<Product> {
    try {
      this.rmqService.acknowledgeMessage(context);
      console.log(payload);
      return await this.productsService.getOne({
        productId: payload,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
