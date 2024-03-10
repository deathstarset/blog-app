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

  async find(
    property: string,
    by: 'username' | 'id' | 'role',
    from?: 'create',
  ) {
    const user = await this.userRepo.findOneBy({ [by]: property });
    if (from) {
      return user;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto, profile_image: string) {
    const firstAdmin = await this.find(UserRole.ADMIN, 'role', 'create');
    let user: User;
    if (!firstAdmin) {
      user = this.userRepo.create({
        ...createUserDto,
        role: UserRole.ADMIN,
        profile_image,
      });
      return this.userRepo.save(user);
    }
    if (!createUserDto.adminId && createUserDto.role === UserRole.ADMIN) {
      throw new UnauthorizedException('Cannot create admin user');
    }
    const admin = await this.find(createUserDto.adminId, 'id');
    if (admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Admin not found | User unauthorized');
    }
    user = this.userRepo.create({ ...createUserDto, profile_image });
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
