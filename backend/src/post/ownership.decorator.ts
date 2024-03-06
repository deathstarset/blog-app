import { SetMetadata } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { SessionUser } from 'src/user/user.types';

export type AuthorizationFunction = (user: SessionUser, post: Post) => boolean;

export const OWNERSHIP_KEY = 'ownership';
export const Ownership = (callback: AuthorizationFunction) =>
  SetMetadata(OWNERSHIP_KEY, callback);
