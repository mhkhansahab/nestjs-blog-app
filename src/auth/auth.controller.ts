import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    signIn(
        @Body('email') email: string,
        @Body('password') password: string) {
            if (email && password) {
                return this.authService.loginUser(email, password);
            } else {
                return {
                    success: false,
                    message: 'Invalid Credentials'
                }
            }
    }

    @Post('/signup')
    signUp(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string) {
        if (name && password && email) {
            return this.authService.signupUser(name, password, email);
        } else {
            return {
                success: false,
                message: 'Invalid Credentials'
            }
        }
    }

    @Get('/validate')
    getValidate(@Headers('Authorization') authToken:string){
        return this.authService.validateToken(authToken);
    }

    @Get('/refresh')
    getRefreshToken(@Headers('Authorization') authToken:string){
        return this.authService.refreshToken(authToken);
    }

}