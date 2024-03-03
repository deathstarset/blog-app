import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(config),
    PostModule,
    CommentModule,
    LikeModule,
    AuthModule,
    FollowModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
