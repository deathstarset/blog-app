import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAllComments(
    @Query('userId') userId?: string,
    @Query('postId') postId?: string,
  ) {
    return await this.commentService.findAll(userId, postId);
  }

  @Get(':id')
  async getComment(@Param('id') id: string) {
    return await this.commentService.find(id);
  }

  @Post()
  async addComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  @Put(':id')
  async editComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async removeComment(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }
}
