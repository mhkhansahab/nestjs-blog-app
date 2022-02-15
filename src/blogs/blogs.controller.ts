import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BlogsService } from "./blogs.service";

@Controller('/blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @Get()
    getBlogs() {
        return this.blogsService.getAllBlogs();
    }

    @Get(':id')
    getBlog(@Param('id') id: string) {
        return this.blogsService.getBlog(id);
    }

    @Post()
    createBlog(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string
    ) {
        return this.blogsService.createBlog(title, description, author);
    }

    @Patch(':id')
    updateBlog(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string
    ) {
        return this.blogsService.updateBlog(id, title, description, author);
    }

    @Delete(':id')
    deleteBlog(@Param('id') id: string) {
        return this.blogsService.deleteBlog(id);
    }
}