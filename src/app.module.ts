import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import connectString from './constants/index.js';

@Module({
  imports: [BlogsModule, MongooseModule.forRoot(connectString?.uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
