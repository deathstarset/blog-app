import { SetMetadata } from '@nestjs/common';
import { Like } from 'src/entities/like.entity';
import { SessionUser } from 'src/user/user.types';

export type AuthFunction = (user: SessionUser, like: Like) => boolean;
export const OWNERSHIP_KEY = 'ownership';
export const Ownership = (callback: AuthFunction) =>
  SetMetadata(OWNERSHIP_KEY, callback);
