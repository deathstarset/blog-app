import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionUser } from 'src/user/user.types';
import { UserService } from 'src/user/user.service';
import { LikeService } from './like.service';
import { AuthFunction, OWNERSHIP_KEY } from './ownership.decorator';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly likeService: LikeService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const callback = this.reflector.get<AuthFunction>(
      OWNERSHIP_KEY,
      context.getHandler(),
    );
    if (!callback) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: SessionUser = request.session.passport.user;
    await this.userService.find(user.id, 'id');
    const likeId: string = request.params.id;
    const like = await this.likeService.find(likeId);
    return callback(user, like);
  }
}
