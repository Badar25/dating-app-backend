import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { Like, LikeSchema } from "src/match/schemas/like.schema";
import { Match, MatchSchema } from "./schemas/match.schema";
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Like.name, schema: LikeSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}