import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Like extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true }) // Indexed for quick lookups
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  likedUserId: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({ userId: 1, likedUserId: 1 }, { unique: true }); // Prevent duplicate likes