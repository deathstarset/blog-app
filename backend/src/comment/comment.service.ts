import { Injectable, NotFoundException } from '@nestjs/common';
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
    let queryObject: { userId?: string; postId?: string } = {};
    if (userId) {
      queryObject.userId = userId;
    }
    if (postId) {
      queryObject.postId = postId;
    }
    return this.commentRepo.findBy(queryObject);
  }

  find(id: string) {
    return this.commentRepo.findOneBy({ id });
  }

  async create(createCommentDto: CreateCommentDto) {
    const post = await this.postService.find(createCommentDto.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await this.userService.find(createCommentDto.userId, 'id');
    if (!user) {
      throw new Error('User not found');
    }
    const comment = this.commentRepo.create(createCommentDto);
    return this.commentRepo.save(comment);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.find(id);
    if (!comment) {
      throw new NotFoundException();
    }
    Object.assign(comment, updateCommentDto);
    return this.commentRepo.save(comment);
  }

  async delete(id: string) {
    const comment = await this.find(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.commentRepo.remove(comment);
  }
}
