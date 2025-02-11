import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MatchModule } from "./match/match.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/dating-app",),
    MatchModule,
    UserModule,
  ],

})
export class AppModule {}