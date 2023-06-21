import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';

import { UpdateCartInput } from './dto/update-cart.input';
import { ADMIN, JwtAuthGuard, RoleGuard, Roles, USER } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { Cart } from '@app/db-lib';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Roles(ADMIN, USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Cart, { name: 'cart' })
  public getCartByUserId(@Args('userId') id: string) {
    return this.cartService.getOne(id);
  }

  @Roles(ADMIN, USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Cart)
  public updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return this.cartService.update(
      updateCartInput.userId,
      updateCartInput.product,
    );
  }
}
