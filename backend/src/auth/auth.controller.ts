import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { user, msg: 'user Registered' };
  }
  @Post('login')
  signIn(@Request() request: Express.Request): any {
    return { user: request.user, msg: 'user logged in' };
  }

  @Get('logout')
  logOut(@Request() request: Express.Request) {
    request.session.destroy((error) => {});
    return { msg: 'user session has ended' };
  }
}
