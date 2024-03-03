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
  async addLike(@Body() createLikeDto: CreateLikeDto) {
    const like = await this.likeService.create(createLikeDto);
    return { like, message: 'Like created' };
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editLike(
    @Body() updateLikeDto: UpdateLikeDto,
    @Param('id') id: string,
  ) {
    const like = await this.likeService.update(id, updateLikeDto);
    return { like, message: 'Like edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeLike(@Param('id') id: string) {
    const like = await this.likeService.delete(id);
    return { like, message: 'Like deleted' };
  }
}
