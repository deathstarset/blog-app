import { Injectable } from '@nestjs/common';
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
    let posts = this.postRepo.createQueryBuilder('post');
    if (userId) {
      posts = posts.where('post.userId = :userId', { userId });
    }
    return posts.getMany();
  }

  find(id: string) {
    return this.postRepo
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .getOne();
  }

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.find(createPostDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(createPostDto)
      .execute();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepo
      .createQueryBuilder()
      .update()
      .set(updatePostDto)
      .where('id = :id', { id })
      .execute();
  }

  delete(id: string) {
    return this.postRepo
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id', { id })
      .execute();
  }
}
