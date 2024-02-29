import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from 'src/entities/comment.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  findAll(userId: string, postId: string) {
    let comments = this.commentRepo.createQueryBuilder('comment');
    if (userId) {
      comments = comments.where('comment.userId = :userId', { userId });
    }
    if (postId) {
      comments = comments.where('comment.postId = :postId', { postId });
    }
    return comments.getMany();
  }

  find(id: string) {
    return this.commentRepo
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .getOne();
  }

  async create(createCommentDto: CreateCommentDto) {
    const post = await this.postService.find(createCommentDto.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await this.userService.find(createCommentDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.commentRepo
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values(createCommentDto)
      .execute();
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo
      .createQueryBuilder()
      .update()
      .set(updateCommentDto)
      .where('comment.id = :id', { id })
      .execute();
  }

  delete(id: string) {
    return this.commentRepo
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('comment.id = :id', { id })
      .execute();
  }
}
