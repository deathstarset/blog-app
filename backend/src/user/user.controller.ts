import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

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
    const user = await this.userService.find(id);
    return { user };
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return { newUser };
  }

  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const newUser = await this.userService.update(id, updateUserDto);
    return { newUser };
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const oldUser = await this.userService.delete(id);
    return { oldUser };
  }
}
