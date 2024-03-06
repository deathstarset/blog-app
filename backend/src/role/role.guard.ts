import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/entities/user.entity';
import { ROLE_KEY } from './role.decorator';
import { SessionUser } from 'src/user/user.types';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const user: SessionUser = context.switchToHttp().getRequest().user;
    if (requiredRole !== user.role) {
      return false;
    }
    return true;
  }
}
