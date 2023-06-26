import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput {
  @Field()
  userId: string;

  @Field()
  productId: string;
}
