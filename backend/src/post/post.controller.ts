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

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllposts(@Query('userId') userId: string) {
    const posts = await this.postService.findAll(userId);
    return { posts, message: 'Posts fetched' };
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const post = await this.postService.find(id);
    return { post, message: 'Post fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addPost(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);
    return { post, message: 'Post created' };
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editPost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    return { post, message: 'Post edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removePost(@Param('id') id: string) {
    const post = await this.postService.delete(id);
    return { post, message: 'Post deleted' };
  }
}
