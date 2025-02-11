import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false }) 
  imageUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
