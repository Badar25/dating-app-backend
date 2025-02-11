import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { Like, LikeSchema } from "src/match/schemas/like.schema";
import { Match, MatchSchema } from "./schemas/match.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}