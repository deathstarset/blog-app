import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), UserModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
