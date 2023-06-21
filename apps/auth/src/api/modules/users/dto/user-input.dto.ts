import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  refreshToken: string;

  @Field({ nullable: true })
  login: string;
}
