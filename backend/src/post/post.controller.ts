import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllposts(@Query('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.find(id);
  }

  @Post()
  async addPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async editPost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
