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
import { SessionUser } from 'src/user/user.types';

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

  async find(id: string) {
    const like = await this.likeRepo.findOneBy({ id });
    if (!like) {
      throw new NotFoundException('Like not found');
    }
    return this.likeRepo.findOneBy({ id });
  }

  async create(user: SessionUser, createLikeDto: CreateLikeDto) {
    await this.userService.find(user.id, 'id');
    if (createLikeDto.commentId)
      await this.commentService.find(createLikeDto.commentId);

    if (createLikeDto.postId) await this.postService.find(createLikeDto.postId);
    if (
      (createLikeDto.type === 'comment' && !createLikeDto.commentId) ||
      (createLikeDto.type === 'post' && !createLikeDto.postId)
    )
      throw new BadRequestException('Id & Type not match');
    const like = this.likeRepo.create({ ...createLikeDto, userId: user.id });
    return this.likeRepo.save(like);
  }

  async update(id: string, updateLikeDto: UpdateLikeDto) {
    const like = await this.find(id);
    Object.assign(like, updateLikeDto);
    return this.likeRepo.save(like);
  }

  async delete(id: string) {
    const like = await this.find(id);
    return this.likeRepo.remove(like);
  }
}
