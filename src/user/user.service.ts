import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async createUser(name: string, password: string, email: string) {
        try {
            const search = await this.userModel.findOne({ email });
            if (!search) {
                const user = new this.userModel({ name, password, email });
                const result = await user.save();
                return result;
            }
            return null;
        } catch (e) {
            throw new NotFoundException('Cannot be created');
        }
    }

    async findUser(email: string, password: string) {
        try {
            const result = await this.userModel.findOne({ email });
            if (result) {
                const isValid = await bcrypt.compare(password, result?.password);
                if(isValid){
                    return result;
                }
            }
            return null;
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }

    async findUserById(id: string) {
        try {
            const result = await this.userModel.findOne({ _id: id });
            if (!result) {
                return null;
            }
            return result;
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }


}