import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { User } from '@app/db-lib';

import { AuthService } from './auth.service';
import { LoginResponse } from './response/user-login.response';
import { UserLoginInput } from './dto/user-login.dto';
import { RefreshResponse } from './response/access-token.response';
import {
  CREATE_USER_INPUT,
  LOGIN_INPUT,
  REFRESH_INPUT,
} from '../../constants/params';
import { UserOutput } from '../users/response/user.response';
import { UserInput } from '../users/dto/user-input.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserOutput)
  public registration(
    @Args(CREATE_USER_INPUT) createUserInput: UserInput,
  ): Promise<UserOutput> {
    return this.authService.registration(createUserInput);
  }

  @Query(() => LoginResponse)
  public login(
    @Args(LOGIN_INPUT) user: UserLoginInput,
  ): Promise<LoginResponse> {
    try {
      return this.authService.login(user);
    } catch (err) {
      throw err;
    }
  }

  @Query(() => RefreshResponse)
  public refresh(@Args(REFRESH_INPUT) token: string): Promise<RefreshResponse> {
    try {
      return this.authService.refresh(token);
    } catch (error) {
      throw error;
    }
  }
}
