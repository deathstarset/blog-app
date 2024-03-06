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
import { User } from 'src/user/user.decorator';
import { SessionUser } from 'src/user/user.types';
import { OwnershipGuard } from './ownership.guard';
import { Ownership } from './ownership.decorator';
import { Follow } from 'src/entities/follow.entity';

@UseGuards(OwnershipGuard)
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
  async addFollow(
    @Body() createFollowDto: CreateFollowDto,
    @User() user: SessionUser,
  ) {
    const follow = await this.followService.create(user, createFollowDto);
    return { follow, message: 'Follow added' };
  }

  // only the follower can remove the follow
  @UseGuards(AuthenticatedGuard)
  @Ownership(
    (user: SessionUser, follow: Follow) => user.id === follow.followerId,
  )
  @Delete(':id')
  async removeFollow(@Param('id') id: string) {
    const follow = await this.followService.delete(id);
    return { follow, message: 'Follow deleted' };
  }
}
