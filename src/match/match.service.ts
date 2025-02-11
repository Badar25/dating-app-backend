import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Like } from "./schemas/like.schema";
import { Match } from "./schemas/match.schema";
import { ResponseDto } from "../common/dto/response.dto";
import { User } from "src/user/schemas/user.schema";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<Like>,
    @InjectModel(Match.name) private readonly matchModel: Model<Match>,
    @InjectModel(User.name) private readonly userModel: Model<User>, 
  ) {}

  async likeUser(userA: string, userB: string): Promise<ResponseDto> {
    // Validate input parameters
    if (!userA || !userB) {
      throw new BadRequestException('Both userA and userB IDs are required');
    }

    if (userA === userB) {
      throw new BadRequestException('Users cannot like themselves');
    }

    try {
      const userAId = new Types.ObjectId(userA);
      const userBId = new Types.ObjectId(userB);

      // Check if like already exists
      const alreadyLiked = await this.likeModel.findOne({
        userId: userAId,
        likedUserId: userBId
      });

      if (alreadyLiked) {
        throw new BadRequestException('You have already liked this user');
      }

      // Check if User B already liked User A
      const existingLike = await this.likeModel.findOne({
        userId: userBId,
        likedUserId: userAId,
      });

      if (existingLike) {
        try {
          // Check if match already exists
          const existingMatch = await this.matchModel.findOne({
            users: { $all: [userAId, userBId] }
          });

          if (existingMatch) {
            throw new BadRequestException('Match already exists between these users');
          }

          // Get both user profiles
          const [userAProfile, userBProfile] = await Promise.all([
            this.userModel.findById(userAId).select('name imageUrl'),
            this.userModel.findById(userBId).select('name imageUrl'),
            this.matchModel.create({ users: [userAId, userBId].sort() }),
            this.likeModel.deleteMany({
              $or: [
                { userId: userAId, likedUserId: userBId },
                { userId: userBId, likedUserId: userAId },
              ],
            })
          ]);

          if (!userAProfile || !userBProfile) {
            throw new NotFoundException('One or both user profiles not found');
          }

          return new ResponseDto(200, `Match found! You and ${userBProfile.name} are now friends!`, {
            initiator: userAProfile,    // The user who completed the match
            acceptor: userBProfile,     // The user who had liked first
            matchTimestamp: new Date()
          });
        } catch (error) {
          if (error instanceof BadRequestException) {
            throw error;
          }
          if (error.code === 11000) {  // MongoDB duplicate key error
            throw new BadRequestException('Match already exists between these users');
          }
          throw new Error('Failed to process match: ' + error.message);
        }
      }

      // Create new like
      await this.likeModel.create({ userId: userAId, likedUserId: userBId });
      return new ResponseDto(201, `Like sent successfully`, {});

    } catch (error) {
      if (error.name === 'BSONError' || error.name === 'CastError') {
        throw new BadRequestException('Invalid user ID format');
      }
      throw error; // Re-throw other errors
    }
  }
}