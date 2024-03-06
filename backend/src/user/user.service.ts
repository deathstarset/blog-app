import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async find(property: string, by: 'username' | 'id' | 'role') {
    const user = await this.userRepo.findOneBy({ [by]: property });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const firstAdmin = await this.find(UserRole.ADMIN, 'role');
    let user: User;
    if (!firstAdmin) {
      user = this.userRepo.create({
        ...createUserDto,
        role: UserRole.ADMIN,
      });
      return this.userRepo.save(user);
    }
    if (!createUserDto.adminId && createUserDto.role === UserRole.ADMIN) {
      throw new UnauthorizedException('Cannot create admin user');
    }
    const admin = await this.find(createUserDto.adminId, 'id');
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Admin not found | User unauthorized');
    }
    user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }
  async delete(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    return this.userRepo.remove(user);
  }
}
