import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

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
    return user;
  }
}
