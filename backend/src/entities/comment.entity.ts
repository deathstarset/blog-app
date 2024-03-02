import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ update: false, type: 'uuid' })
  userId: string;

  @ManyToOne((type) => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'postId' })
  post: Post;
  @Column({ update: false, type: 'uuid' })
  postId: string;

  @OneToMany((type) => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;
}
