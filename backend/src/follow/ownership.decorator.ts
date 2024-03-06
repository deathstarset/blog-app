import { SetMetadata } from '@nestjs/common';
import { Follow } from 'src/entities/follow.entity';
import { SessionUser } from 'src/user/user.types';

export type AuthFunction = (user: SessionUser, follow: Follow) => boolean;
export const OWNERSHIP_KEY = 'ownership';
export const Ownership = (callback: AuthFunction) =>
  SetMetadata(OWNERSHIP_KEY, callback);
