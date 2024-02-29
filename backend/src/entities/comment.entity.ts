import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  content: string;

  //  Todo: Add update to false
  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column({ update: false, nullable: false })
  userId: string;

  @Column({ update: false, nullable: false })
  postId: string;
}
