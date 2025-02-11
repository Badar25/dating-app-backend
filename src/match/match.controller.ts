import { Controller, Post, Body } from "@nestjs/common";
import { MatchService } from "./match.service";
import { ResponseDto } from "../common/dto/response.dto";

@Controller("match")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post("like")
  async likeUser(@Body("userA") userA: string, @Body("userB") userB: string): Promise<ResponseDto> {
    return this.matchService.likeUser(userA, userB);
  }
}