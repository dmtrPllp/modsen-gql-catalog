import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  login: string;

  refreshToken?: string;
}
