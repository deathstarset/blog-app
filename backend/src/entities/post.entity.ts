import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ update: false, nullable: false })
  userId: string;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Like, (like) => like.post)
  likes: Like[];

  @ManyToMany((type) => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;
}
