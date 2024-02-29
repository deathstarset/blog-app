import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, PostModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
