import { Resolver, Query, Context, ResolveReference } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '@app/db-lib';

import {
  ADMIN,
  JwtAuthGuard,
  RequestWithUser,
  RoleGuard,
  Roles,
  USER,
} from '@app/common';

import { UsersService } from './users.service';
import { UserOutput } from './response/user.response';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ADMIN, USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => User)
  getCurrentUser(@Context('req') req: RequestWithUser): Promise<UserOutput> {
    return this.usersService.getFullUserByParameter({ login: req.user.login });
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<UserOutput> {
    console.log('ref', reference);
    return await this.usersService.getFullUserByParameter({ id: reference.id });
  }

  // @ResolveField(() => Cart)
  // public cart(@Parent() user: User) {
  //   return { __typename: 'Cart', id: user.id };
  // }
}
