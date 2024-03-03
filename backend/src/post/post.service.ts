import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/entities/category.entity';

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

  find(id: string) {
    return this.postRepo.findOneBy({ id });
  }

  async create(createPostDto: CreatePostDto) {
    const categories: Category[] = [];
    for (const categoryId of createPostDto.categories) {
      const category = await this.categoryService.find(categoryId, 'id');
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      categories.push(category);
    }
    const user = await this.userService.find(createPostDto.userId, 'id');
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepo.create({ ...createPostDto, categories });
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
