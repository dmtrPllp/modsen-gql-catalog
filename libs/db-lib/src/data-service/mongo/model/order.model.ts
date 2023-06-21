import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SchemaTypes } from 'mongoose';

import { Product } from './product.model';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
  @Prop({ unique: true, index: true })
  id: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
