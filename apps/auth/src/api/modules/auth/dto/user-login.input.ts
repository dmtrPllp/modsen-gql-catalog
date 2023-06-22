import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  password: string;

  @Field()
  login: string;
}
