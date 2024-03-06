import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationFunction, OWNERSHIP_KEY } from './ownership.decorator';
import { SessionUser } from 'src/user/user.types';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const callback = this.reflector.get<AuthorizationFunction>(
      OWNERSHIP_KEY,
      context.getHandler(),
    );
    if (!callback) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: SessionUser = request.session.passport.user;
    await this.userService.find(user.id, 'id');
    const postId: string = request.params.id;
    const post = await this.postService.find(postId);

    return callback(user, post);
  }
}
