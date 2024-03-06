import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 2
  async validate(username: string, pass: string) {
    const user = await this.userService.find(username, 'username');
    const isSimilar = await bcrypt.compare(pass, user.password);
    if (!isSimilar) {
      return null;
    }
    const { password, ...other } = user;
    return other;
  }
}
