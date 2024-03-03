import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  findAll(userId: string) {
    const queryObject: { userId?: string } = {};
    if (userId) {
      queryObject.userId = userId;
    }
    return this.postRepo.findBy(queryObject);
  }

  find(id: string) {
    return this.postRepo.findOneBy({ id });
  }

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.find(createPostDto.userId, 'id');
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepo.create(createPostDto);
    return this.postRepo.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.find(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    Object.assign(post, updatePostDto);
    return this.postRepo.save(post);
  }

  async delete(id: string) {
    const post = await this.find(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepo.remove(post);
  }
}
