import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema({ versionKey: false })
@Directive('@key(fields: "id")')
export class Product {
  _id: string;

  @Field(() => ID)
  @Directive('@shareable')
  @Prop({ unique: true, index: true })
  id: string;

  @Field()
  @Directive('@shareable')
  @Prop({ required: true })
  name: string;

  @Field()
  @Directive('@shareable')
  @Prop({ required: true })
  description: string;

  @Field()
  @Directive('@shareable')
  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
