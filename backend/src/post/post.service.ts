import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/entities/category.entity';
import { UserRole } from 'src/entities/user.entity';
import { SessionUser } from 'src/user/user.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  findAll(userId: string, category: string) {
    const queryObject: { userId?: string; category?: string } = {};
    if (userId) {
      queryObject.userId = userId;
    }
    if (category) {
      queryObject.category = category;
    }
    return this.postRepo.findBy(queryObject);
  }

  async find(id: string) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(user: SessionUser, createPostDto: CreatePostDto) {
    await this.userService.find(user.id, 'id');
    const categories: Category[] = await this.categoryService.findAll(
      createPostDto.categories,
      'id',
    );
    const post = this.postRepo.create({
      ...createPostDto,
      userId: user.id,
      categories,
    });
    return this.postRepo.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.find(id);
    Object.assign(post, updatePostDto);
    return this.postRepo.save(post);
  }

  async delete(id: string) {
    const post = await this.find(id);
    return this.postRepo.remove(post);
  }
}
