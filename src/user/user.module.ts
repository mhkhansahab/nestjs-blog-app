import { Module } from "@nestjs/common";
import { userSchema } from "./user.model";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [MongooseModule.forFeature([{name:'User', schema: userSchema}])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }