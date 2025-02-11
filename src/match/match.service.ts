import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Like } from "./schemas/like.schema";
import { Match } from "./schemas/match.schema";
import { ResponseDto } from "../common/dto/response.dto";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<Like>,
    @InjectModel(Match.name) private readonly matchModel: Model<Match>,
  ) {}

  async likeUser(userA: string, userB: string): Promise<ResponseDto> {
    const userAId = new Types.ObjectId(userA);
    const userBId = new Types.ObjectId(userB);

    // Check if User B already liked User A (Indexed Already)
    const existingLike = await this.likeModel.findOne({
      userId: userBId,
      likedUserId: userAId,
    });

    if (existingLike) {
      // Match found! Save to matches and delete old likes ()
      await this.matchModel.create({ users: [userAId, userBId].sort() });

      // Cleanup likes
      await this.likeModel.deleteMany({
        $or: [
          { userId: userAId, likedUserId: userBId },
          { userId: userBId, likedUserId: userAId },
        ],
      });

      return new ResponseDto(200, `Match found! ${userA} and ${userB} are now friends!`, true);
    }

    // No match yet, just saving the like for now
    await this.likeModel.create({ userId: userAId, likedUserId: userBId });

    return new ResponseDto(201, `${userA} liked ${userB}`, false);
  }
}