import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ update: false })
  userId: string;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];
}
