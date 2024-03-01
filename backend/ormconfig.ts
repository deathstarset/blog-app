import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './src/entities/user.entity';
import { Post } from './src/entities/post.entity';
import { Comment } from './src/entities/comment.entity';
import { Like } from './src/entities/like.entity';
import 'dotenv/config';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.db_name,
  host: process.env.db_host,
  port: 5432,
  username: process.env.username,
  password: process.env.password,
  synchronize: true,
  ssl: true,
  entities: [User, Post, Comment, Like],
};
