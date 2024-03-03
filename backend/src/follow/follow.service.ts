import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './follow.dto';
import { UserService } from 'src/user/user.service';

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

  find(id: string) {
    return this.followRepo.findOneBy({ id });
  }

  async create(createFollowDto: CreateFollowDto) {
    const follower = await this.userService.find(
      createFollowDto.followerId,
      'id',
    );
    const following = await this.userService.find(
      createFollowDto.followingId,
      'id',
    );
    if (!following || !follower) {
      throw new NotFoundException('User not found');
    }
    const follow = this.followRepo.create(createFollowDto);
    return this.followRepo.save(follow);
  }

  async delete(id: string) {
    const follow = await this.find(id);
    if (!follow) {
      throw new NotFoundException('Follow not found');
    }
    return this.followRepo.remove(follow);
  }
}
