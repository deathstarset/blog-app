import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.createQueryBuilder('user').getMany();
  }

  find(id: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepo
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();
  }
  delete(id: string) {
    return this.userRepo
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
