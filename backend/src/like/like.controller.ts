import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdateLikeDto, createLikeDto } from './like.dto';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  async getAllLikes(
    @Query('userId') userId?: string,
    @Query('commentId') commentId?: string,
    @Query('postId') postId?: string,
  ) {
    return await this.likeService.findAll(userId, commentId, postId);
  }

  @Get(':id')
  async getLike(@Param('id') id: string) {
    return await this.likeService.find(id);
  }

  @Post()
  async addLike(@Body() createLikeDto: createLikeDto) {
    return await this.likeService.create(createLikeDto);
  }

  @Put(':id')
  async editLike(
    @Body() updateLikeDto: UpdateLikeDto,
    @Param('id') id: string,
  ) {
    return await this.likeService.update(id, updateLikeDto);
  }

  @Delete(':id')
  async removeLike(@Param('id') id: string) {
    return await this.likeService.delete(id);
  }
}
