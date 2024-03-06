import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './follow.dto';
import { UserService } from 'src/user/user.service';
import { SessionUser } from 'src/user/user.types';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
    private readonly userService: UserService,
  ) {}

  findAll(followerId?: string, followingId?: string) {
    const queryObject: { followerId?: string; followingId?: string } = {};
    if (followerId) {
      queryObject.followerId = followerId;
    }
    if (followingId) {
      queryObject.followingId = followingId;
    }
    return this.followRepo.findBy(queryObject);
  }

  async find(id: string) {
    const follow = await this.followRepo.findOneBy({ id });
    if (!follow) {
      throw new NotFoundException('Follow not found');
    }
    return follow;
  }

  async create(user: SessionUser, createFollowDto: CreateFollowDto) {
    await this.userService.find(user.id, 'id');
    await this.userService.find(createFollowDto.followingId, 'id');
    const follow = this.followRepo.create({
      ...createFollowDto,
      followerId: user.id,
    });
    return this.followRepo.save(follow);
  }

  async delete(id: string) {
    const follow = await this.find(id);
    return this.followRepo.remove(follow);
  }
}
