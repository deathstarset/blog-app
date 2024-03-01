import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Like } from './like.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  content: string;

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

  @OneToMany((type) => Like, (like) => like.comment)
  likes: Like[];
}
