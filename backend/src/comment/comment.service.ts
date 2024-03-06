import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from 'src/entities/comment.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { SessionUser } from 'src/user/user.types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  findAll(userId: string, postId: string) {
    let queryObject: { userId?: string; postId?: string } = {};
    if (userId) {
      queryObject.userId = userId;
    }
    if (postId) {
      queryObject.postId = postId;
    }
    return this.commentRepo.findBy(queryObject);
  }

  async find(id: string) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async create(user: SessionUser, createCommentDto: CreateCommentDto) {
    await this.postService.find(createCommentDto.postId);
    await this.userService.find(user.id, 'id');
    const comment = this.commentRepo.create({
      ...createCommentDto,
      userId: user.id,
    });
    return this.commentRepo.save(comment);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.find(id);
    Object.assign(comment, updateCommentDto);
    return this.commentRepo.save(comment);
  }

  async delete(id: string) {
    const comment = await this.find(id);
    return this.commentRepo.remove(comment);
  }
}
