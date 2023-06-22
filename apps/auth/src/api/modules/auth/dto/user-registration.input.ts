import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserRegistrationInput {
  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  login: string;
}
