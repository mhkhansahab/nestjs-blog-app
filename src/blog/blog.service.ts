import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Blog } from "./blog.model";
import { Model } from "mongoose";

@Injectable()
export class BlogsService {
    constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }

    async getAllBlogs() {
        try {
            const result = await this.blogModel.find();
            return result;
        } catch {
            throw new NotFoundException('Cannot find any blog');
        }
    }

    async getMyAllBlogs(id: string) {
        try {
            const result = await this.blogModel.find({ authorId: id })
            return result;
        } catch {
            throw new NotFoundException('Cannot find any blog');
        }
    }

    async getBlog(id: string) {
        try {
            const result = await this.blogModel.findById({ _id: id })
            return result;
        } catch {
            throw new NotFoundException('Cannot find any blog');
        }
    }

    async createBlog(title: string, description: string, author: string, authorId: string) {
        try {
            const blog = new this.blogModel({ title, description, author , authorId});
            const result = await blog.save();
            return result;
        } catch {
            throw new NotFoundException('Cannot create blog')
        }
    }

    async deleteBlog(id: string) {
        try {
            const result = await this.blogModel.findByIdAndDelete({ _id: id });
            return result;
        } catch {
            throw new NotFoundException('Cannot be deleted')
        }
    }

    async updateBlog(id: string, title: string, description: string, author: string) {
        try {
            const result = await this.blogModel.findByIdAndUpdate({ _id: id }, {
                title,
                description,
                author
            });
            return result;
        } catch {
            throw new NotFoundException('Cannot be updated')
        }
    }
}