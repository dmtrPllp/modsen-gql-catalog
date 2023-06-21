import { Field, ObjectType } from '@nestjs/graphql';

import { UserOutput } from '../../users/response/user.response';

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => UserOutput)
  user: UserOutput;
}
