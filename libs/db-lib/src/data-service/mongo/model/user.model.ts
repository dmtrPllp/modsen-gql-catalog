import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { SchemaTypes } from 'mongoose';

import { Order } from './order.model';

export type UserDocument = User & Document;

@ObjectType()
@Directive('@key(fields: "id")')
@Schema({ versionKey: false })
export class User {
  @Field(() => ID)
  @Prop({ unique: true, index: true })
  id: string;

  @Field()
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  login: string;

  @Field()
  @Prop({
    required: true,
    unique: true,
    validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  })
  email: string;

  @Field()
  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop({ nullable: true })
  refreshToken: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Order' }] })
  orders: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
