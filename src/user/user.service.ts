import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(name: string, imageUrl?: string): Promise<User> {
    const createdUser = new this.userModel({ name, imageUrl });
    return createdUser.save();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async getAllUsers(id?: string): Promise<User[]> {
    console.log(`id: ${id}`);
    if(!id) return this.userModel.find().exec();
    return this.userModel.find({ _id: { $ne: id } }).exec();
  }
}
