import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import constants from './constants/';

@Module({
  imports: [AuthModule, BlogsModule, UserModule, MongooseModule.forRoot(constants?.uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
