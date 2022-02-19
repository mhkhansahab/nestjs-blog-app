import { Module } from "@nestjs/common";
import { BlogsService } from "./blog.service";
import { BlogsController } from "./blog.controller";
import { blogSchema } from './blog.model';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Blog', schema: blogSchema }])],
    controllers: [BlogsController],
    providers: [BlogsService]
})
export class BlogsModule { }