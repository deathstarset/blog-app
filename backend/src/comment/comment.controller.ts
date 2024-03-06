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
import { User } from 'src/user/user.decorator';
import { SessionUser } from 'src/user/user.types';
import { Ownership } from './ownership.decorator';
import { Comment } from 'src/entities/comment.entity';
import { OwnershipGuard } from './ownership.guard';

UseGuards(OwnershipGuard);
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
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: SessionUser,
  ) {
    const comment = await this.commentService.create(user, createCommentDto);
    return { comment, message: 'Comment added' };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership(
    (user: SessionUser, comment: Comment) => user.id === comment.userId,
  )
  @Put(':id')
  async editComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentService.update(id, updateCommentDto);
    return { comment, message: 'Comment edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership(
    (user: SessionUser, comment: Comment) => user.id === comment.userId,
  )
  @Delete(':id')
  async removeComment(@Param('id') id: string) {
    const comment = await this.commentService.delete(id);
    return { comment, message: 'Comment removed' };
  }
}
