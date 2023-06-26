import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ADMIN, JwtAuthGuard, RoleGuard, Roles, USER } from '@app/common';
import { Cart } from '@app/db-lib';

import { UpdateCartInput } from './dto/update-cart.input';
import { User } from './entities/user.entity';
import { CartService } from './cart.service';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Roles(ADMIN, USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Cart, { name: 'cart' })
  public getCartByUserId(@Args('userId') id: string): Promise<Cart> {
    return this.cartService.getOne(id);
  }

  @Roles(ADMIN, USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Cart)
  public updateCart(
    @Args('updateCartInput') updateCartInput: UpdateCartInput,
  ): Promise<Cart> {
    return this.cartService.update(
      updateCartInput.userId,
      updateCartInput.productId,
    );
  }

  @ResolveField(() => User)
  public user(@Parent() cart: Cart) {
    return { __typename: 'User', id: cart.userId };
  }

  // @ResolveReference()
  // async resolveReference(reference: {
  //   __typename: string;
  //   id: string;
  // }): Promise<Cart> {
  //   console.log('ref', reference);
  //   return await this.cartService.getOne(reference.id);
  // }
}
