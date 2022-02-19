import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signupUser(name: string, password: string, email: string) {

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        try {
            const user = await this.userService.createUser(name, hashedPassword, email);
            if (user) {
                const access_token = await this.jwtService.signAsync({ id: user?._id })
                return {
                    success: true,
                    message: 'User Created Succesfully!',
                    access_token
                }
            } else {
                return {
                    success: false,
                    message: 'User Already Exists!'
                }
            }
        } catch (e) {
            return {
                success: false,
                message: 'User Cannot Be Created.'
            }
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await this.userService.findUser(email, password);
            if (user) {
                const access_token = await this.jwtService.signAsync({ id: user?._id })
                return {
                    success: true,
                    message: 'User Authenticated Succesfully!',
                    access_token
                }
            } else {
                return {
                    success: false,
                    message: 'User Not Found!'
                }
            }

        } catch (e) {
            return {
                success: false,
                message: 'User Cannot Be Created.'
            }
        }
    }

    async validateToken(token: string) {
        try {
            const decoded = await this.jwtService.verify(token);
            if(decoded){
                return{
                    success: true,
                    message: 'Successfully Authorized',
                    id: decoded?.id
                }
            }else{
                return {
                    success: false,
                    message: 'Cannot Be Authorized'
                }    
            }
            
        } catch (e) {
            return {
                success: false,
                message: 'Cannot Be Authorized'
            }
        }
    }

    async refreshToken(id:string){
        const access_token = await this.jwtService.signAsync({ id });
        if(access_token){
            return {
                success: true,
                message: 'Token Updated Succesfully!',
                access_token
            }
        }else{
            return {
                success: false,
                message: 'Token Cannot Be Updated',
            }
        }
    }

}