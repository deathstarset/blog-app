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
    const queryObject: {
      userId?: string;
      commentId?: string;
      postId?: string;
    } = {};
    if (userId) {
      queryObject.userId = userId;
    }
    if (commentId) {
      queryObject.commentId = commentId;
    }
    if (postId) {
      queryObject.postId = postId;
    }
    return this.likeRepo.findBy(queryObject);
  }

  find(id: string) {
    return this.likeRepo.findOneBy({ id });
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
    const like = this.likeRepo.create(createLikeDto);
    return this.likeRepo.save(like);
  }

  async update(id: string, updateLikeDto: UpdateLikeDto) {
    const like = await this.find(id);
    if (!like) {
      throw new NotFoundException('Like not found');
    }
    Object.assign(like, updateLikeDto);
    return this.likeRepo.save(like);
  }

  async delete(id: string) {
    const like = await this.find(id);
    if (!like) {
      throw new NotFoundException('like not found');
    }
    return this.likeRepo.remove(like);
  }
}
