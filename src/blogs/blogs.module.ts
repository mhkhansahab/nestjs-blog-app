import { Module } from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { BlogsController } from "./blogs.controller";
import { blogSchema } from './blogs.model';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Blog', schema: blogSchema }])],
    controllers: [BlogsController],
    providers: [BlogsService]
})
export class BlogsModule { }