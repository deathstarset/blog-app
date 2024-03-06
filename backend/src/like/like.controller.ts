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
import { SessionUser } from 'src/user/user.types';
import { User } from 'src/user/user.decorator';
import { OwnershipGuard } from './ownership.guard';
import { Ownership } from './ownership.decorator';
import { Like } from 'src/entities/like.entity';

@UseGuards(OwnershipGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  async getAllLikes(
    @Query('userId') userId?: string,
    @Query('commentId') commentId?: string,
    @Query('postId') postId?: string,
  ) {
    const likes = await this.likeService.findAll(userId, commentId, postId);
    return { likes, message: 'Likes fetched' };
  }

  @Get(':id')
  async getLike(@Param('id') id: string) {
    const like = await this.likeService.find(id);
    return { like, message: 'Like fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addLike(
    @Body() createLikeDto: CreateLikeDto,
    @User() user: SessionUser,
  ) {
    const like = await this.likeService.create(user, createLikeDto);
    return { like, message: 'Like created' };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership((user: SessionUser, like: Like) => user.id === like.userId)
  @Put(':id')
  async editLike(
    @Body() updateLikeDto: UpdateLikeDto,
    @Param('id') id: string,
  ) {
    const like = await this.likeService.update(id, updateLikeDto);
    return { like, message: 'Like edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Ownership((user: SessionUser, like: Like) => user.id === like.userId)
  @Delete(':id')
  async removeLike(@Param('id') id: string) {
    const like = await this.likeService.delete(id);
    return { like, message: 'Like deleted' };
  }
}
