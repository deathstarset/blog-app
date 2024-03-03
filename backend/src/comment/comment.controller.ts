import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

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
    const comment = await this.commentService.find(id);
    return { comment, message: 'Comment fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addComment(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.create(createCommentDto);
    return { comment, message: 'Comment added' };
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentService.update(id, updateCommentDto);
    return { comment, message: 'Comment edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeComment(@Param('id') id: string) {
    const comment = await this.commentService.delete(id);
    return { comment, message: 'Comment removed' };
  }
}
