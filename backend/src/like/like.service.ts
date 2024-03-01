import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { UpdateLikeDto, createLikeDto } from './like.dto';
import { UserService } from 'src/user/user.service';
import { CommentService } from 'src/comment/comment.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  findAll(userId: string, commentId: string, postId: string) {
    let likes = this.likeRepo.createQueryBuilder('like');

    if (userId) {
      likes = likes.where('like.userId = :userId', { userId });
    }
    if (commentId) {
      likes = likes.where('like.commentId = :commentId', { commentId });
    }
    if (postId) {
      likes = likes.where('like.postId = :postId', { postId });
    }

    return likes.getMany();
  }

  find(id: string) {
    return this.likeRepo
      .createQueryBuilder('like')
      .where('like.id = :id', { id })
      .getOne();
  }

  async create(createLikeDto: createLikeDto) {
    const user = await this.userService.find(createLikeDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const comment = await this.commentService.find(createLikeDto.commentId);
    const post = await this.postService.find(createLikeDto.postId);

    if (!comment && !post) {
      throw new Error('Post or Comment not found');
    }

    return this.likeRepo
      .createQueryBuilder()
      .insert()
      .into(Like)
      .values(createLikeDto)
      .execute();
  }

  update(id: string, updateLikeDto: UpdateLikeDto) {
    return this.likeRepo
      .createQueryBuilder()
      .update()
      .set(updateLikeDto)
      .where('like.id = :id', { id })
      .execute();
  }

  delete(id: string) {
    return this.likeRepo
      .createQueryBuilder()
      .delete()
      .from(Like)
      .where('like.id = :id', { id })
      .execute();
  }
}
