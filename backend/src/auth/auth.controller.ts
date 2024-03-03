import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { Request as Req } from 'express';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local.auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() request: Req): any {
    return { user: request.user };
  }

  @Get('logout')
  logOut(@Request() request: Express.Request) {
    request.session.destroy((error) => {});
    return { message: 'user session has ended' };
  }
}
