import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { SchemaTypes } from 'mongoose';

export type CartDocument = Cart & Document;

@ObjectType()
@Schema({ versionKey: false })
export class Cart {
  @Field(() => [String])
  @Directive('@shareable')
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: string[];

  @Field()
  @Directive('@shareable')
  @Prop({ required: true, unique: true })
  userId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
