import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { SchemaTypes } from 'mongoose';
import { Product } from '@app/db-lib';

export type CartDocument = Cart & Document;

// @ObjectType()
// @Directive('@key(fields: "id")')
// export class Product {
//   @Field(() => ID)
//   id: string;
// }

@ObjectType()
@Schema({ versionKey: false })
export class Cart {
  @Field(() => ID)
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Field()
  @Prop({ required: true, unique: true })
  userId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
