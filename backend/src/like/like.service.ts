import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { UpdateLikeDto, CreateLikeDto } from './like.dto';
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

  async create(createLikeDto: CreateLikeDto) {
    const user = await this.userService.find(createLikeDto.userId, 'id');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (createLikeDto.commentId) {
      const comment = await this.commentService.find(createLikeDto.commentId);
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
    }
    if (createLikeDto.postId) {
      const post = await this.postService.find(createLikeDto.postId);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
    }

    if (
      (createLikeDto.type === 'comment' && !createLikeDto.commentId) ||
      (createLikeDto.type === 'post' && !createLikeDto.postId)
    ) {
      throw new BadRequestException('Id & Type not match');
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
