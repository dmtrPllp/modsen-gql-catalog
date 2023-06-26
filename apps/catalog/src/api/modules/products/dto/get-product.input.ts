import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetProductInput {
  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  objectId?: string;
}
