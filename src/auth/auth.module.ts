import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import constants from './../constants/';
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
    imports: [UserModule, JwtModule.register({
        secret: constants?.secret,
        signOptions: { expiresIn: '3600s' },
    })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }