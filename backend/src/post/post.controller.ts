import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getAllposts(
    @Query('userId') userId: string,
    @Request() request: Express.Request,
  ) {
    console.log(request);
    return this.postService.findAll(userId);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.find(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editPost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
