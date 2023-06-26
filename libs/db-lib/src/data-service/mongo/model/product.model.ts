import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

export type ProductDocument = Product & Document;

@ObjectType()
@Directive('@key(fields: "id")')
@Schema({ versionKey: false })
export class Product {
  _id: string;

  @Field(() => ID)
  @Prop({ unique: true, index: true })
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
