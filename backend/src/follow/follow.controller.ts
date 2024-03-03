import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './follow.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getAllFollows(
    @Query('followerId') followerId: string,
    @Query('followingId') followingId: string,
  ) {
    const follows = await this.followService.findAll(followerId, followingId);
    return { follows, message: 'Follows fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('id')
  async getFollow(@Param('id') id: string) {
    const follow = await this.followService.find(id);
    return { follow, message: 'Follow fetched' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addFollow(@Body() createFollowDto: CreateFollowDto) {
    const follow = await this.followService.create(createFollowDto);
    return { follow, message: 'Follow added' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeFollow(@Param('id') id: string) {
    const follow = await this.followService.delete(id);
    return { follow, message: 'Follow deleted' };
  }
}
