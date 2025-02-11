import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Match extends Document {
  @Prop({ type: [Types.ObjectId], required: true, unique: true })
  users: Types.ObjectId[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);