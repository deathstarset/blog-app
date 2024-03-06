import { UserRole } from 'src/entities/user.entity';

export interface SessionUser {
  id: string;
  role: UserRole;
}
