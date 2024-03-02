import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

export enum LikeType {
  COMMENT = 'comment',
  POST = 'post',
}

@Entity()
@Unique(['userId', 'commentId', 'type'])
@Unique(['userId', 'postId', 'type'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  isLike: boolean;

  @Column({ type: 'enum', enum: ['comment', 'post'], nullable: false })
  type: 'post' | 'comment';

  @ManyToOne((type) => User, (user) => user.likes, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ update: false })
  userId: string;

  @ManyToOne((type) => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'postId' })
  post: Post;
  @Column({ update: false, type: 'uuid', nullable: true })
  postId: string;

  @ManyToOne((type) => Comment, (comment) => comment.likes, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
  @Column({ update: false, type: 'uuid', nullable: true })
  commentId: string;

  @CreateDateColumn()
  createdAt: Date;
}
