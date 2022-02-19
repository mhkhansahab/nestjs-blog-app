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
            const blog = await this.blogsService.createBlog(title, description, author);
            return {
                success: true,
                message: 'Blog Created Successfully',
                data: blog
            }
        } else {
            return {
                success: false,
                message: 'Blog Cannot Be Created',
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
                data: blog
            }
        } else {
            return {
                success: false,
                message: 'Blog Cannot Be Updated',
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
                data: blog
            }
        } else {
            return {
                success: false,
                message: 'Blog Cannot Be Deleted',
            }
        }
    }
}