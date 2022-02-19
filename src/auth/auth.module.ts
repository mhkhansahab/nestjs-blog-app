import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
    imports: [UserModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
    })],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }