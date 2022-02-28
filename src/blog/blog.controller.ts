import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from "@nestjs/common";
import { BlogsService } from "./blog.service";
import { AuthService } from "src/auth/auth.service";

@Controller('/blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private readonly authService: AuthService
    ) { }

    @Get()
    getBlogs() {
        return this.blogsService.getAllBlogs();
    }

    @Get('/me/:id')
    async getMyBlogs(
        @Param('id') id: string,
        @Headers('Authorization') authToken: string
    ) {
        const response = await this.authService.validateToken(authToken);

        if (response?.success) {
        const result = await this.blogsService.getMyAllBlogs(id);
        return {
            success: true,
            message: 'Blogs Getted Successfully',
            data: result
        };
    }else{
        return {
            success: false,
            message: 'Unauthorized User!'
        };
    }
    }

    @Get(':id')
    getBlog(
        @Param('id') id: string
    ) {
        return this.blogsService.getBlog(id);
    }

    @Post()
    async createBlog(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string,
        @Headers('Authorization') authToken: string
    ) {
        const response = await this.authService.validateToken(authToken);

        if (response?.success) {
            const authorId = response?.id;
            const blog = await this.blogsService.createBlog(title, description, author, authorId);
            return {
                success: true,
                message: 'Blog Created Successfully',
                data: {
                    title: blog?.title,
                    description: blog?.description,
                    id: blog?._id,
                    author: blog?.author,
                    authorId:blog?.authorId
                }
            }
        } else {
            return {
                success: false,
                message: 'Unauthorized User!',
            }
        }
    }

    @Patch(':id')
    async updateBlog(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string,
        @Headers('Authorization') authToken: string
    ) {
        const response = await this.authService.validateToken(authToken);
        if (response?.success) {
            const blog = await this.blogsService.updateBlog(id, title, description, author);
            return {
                success: true,
                message: 'Blog Updated Successfully',
                data: {
                    title: blog?.title,
                    description: blog?.description,
                    id: blog?._id,
                    author: blog?.author,
                    authorId: response?.id
                }
            }
        } else {
            return {
                success: false,
                message: 'Unauthorized User!',
            }
        }
    }

    @Delete(':id')
    async deleteBlog(
        @Param('id') id: string,
        @Headers('Authorization') authToken: string
    ) {
        const response = await this.authService.validateToken(authToken);
        if (response?.success) {
            const blog = await this.blogsService.deleteBlog(id);
            return {
                success: true,
                message: 'Blog Deleted Successfully',
                data: {
                    title: blog?.title,
                    description: blog?.description,
                    id: blog?._id,
                    author: blog?.author,
                    authorId: response?.id
                }
            }
        } else {
            return {
                success: false,
                message: 'Unauthorized User!',
            }
        }
    }
}