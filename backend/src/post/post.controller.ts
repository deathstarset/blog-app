import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/user/user.decorator';
import { SessionUser } from 'src/user/user.types';
import { OwnershipGuard } from './ownership.guard';
import { Ownership } from './ownership.decorator';
import { Post as P } from 'src/entities/post.entity';
import express from 'express';

@UseGuards(OwnershipGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllposts(
    @Query('userId') userId: string,
    @Query('category') category: string,
  ) {
    const posts = await this.postService.findAll(userId, category);
    return { posts, message: 'Posts fetched' };
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const post = await this.postService.find(id);
    return { post, message: 'Post fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addPost(
    @Body() createPostDto: CreatePostDto,
    @User() user: SessionUser,
  ) {
    const post = await this.postService.create(user, createPostDto);
    return { post, message: 'Post created', user };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership((user: SessionUser, post: P) => user.id === post.userId)
  @Put(':id')
  async editPost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    return { post, message: 'Post edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership((user: SessionUser, post: P) => user.id === post.userId)
  @Delete(':id')
  async removePost(@Param('id') id: string) {
    const post = await this.postService.delete(id);
    return { post, message: 'Post deleted' };
  }
}
