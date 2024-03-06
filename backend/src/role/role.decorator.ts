import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/user.entity';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
