import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NoDataResponse {
  @Field(() => String)
  message: string;
}
