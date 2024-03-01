import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

export enum LikeType {
  COMMENT = 'comment',
  POST = 'post',
}
@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isLike: boolean;

  @Column({ enum: ['comment', 'post'] })
  type: LikeType;

  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false, update: false })
  userId: string;

  @ManyToOne((type) => Post, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column({ nullable: true, update: false })
  postId: string;

  @ManyToOne((type) => Comment, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @Column({ nullable: true, update: false })
  commentId: string;
}
