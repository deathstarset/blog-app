import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateLikeDto, CreateLikeDto } from './like.dto';
import { LikeService } from './like.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

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

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addLike(@Body() createLikeDto: CreateLikeDto) {
    return await this.likeService.create(createLikeDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editLike(
    @Body() updateLikeDto: UpdateLikeDto,
    @Param('id') id: string,
  ) {
    return await this.likeService.update(id, updateLikeDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeLike(@Param('id') id: string) {
    return await this.likeService.delete(id);
  }
}
