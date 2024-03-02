import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.find(id, 'id');
    return { user };
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return { newUser };
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const newUser = await this.userService.update(id, updateUserDto);
    return { newUser };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const oldUser = await this.userService.delete(id);
    return { oldUser };
  }
}
