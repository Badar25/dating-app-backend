import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  async createUser(@Body("name") name: string, @Body("imageUrl") imageUrl?: string) {
    return this.userService.createUser(name, imageUrl);
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }
}
