import { Resolver, Query, Context } from '@nestjs/graphql';
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
  @Query(() => UserOutput)
  getCurrentUser(@Context('req') req: RequestWithUser): Promise<UserOutput> {
    console.log(1);
    return this.usersService.getFullUserByParameter({ login: req.user.login });
  }
}
