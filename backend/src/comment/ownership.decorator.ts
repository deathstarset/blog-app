import { SetMetadata } from '@nestjs/common';
import { Comment } from 'src/entities/comment.entity';
import { SessionUser } from 'src/user/user.types';

export type AuthFunction = (user: SessionUser, comment: Comment) => boolean;
export const OWNERSHIP_KEY = 'ownership';
export const Ownership = (callback: AuthFunction) =>
  SetMetadata(OWNERSHIP_KEY, callback);
