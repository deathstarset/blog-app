import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UserRole } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: User, done: (error: Error, userId: string) => void) {
    done(null, user.id);
  }
  async deserializeUser(
    userId: string,
    done: (error: Error, user: { id: string; role: UserRole }) => void,
  ) {
    const user = await this.userService.find(userId, 'id');
    done(null, { id: user.id, role: user.role });
  }
}
