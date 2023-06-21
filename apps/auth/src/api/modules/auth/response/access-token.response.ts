import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
