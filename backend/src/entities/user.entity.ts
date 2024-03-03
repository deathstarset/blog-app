import { Post } from './post.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import * as bcrypt from 'bcrypt';
import { Follow } from './follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];

  @OneToMany((type) => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany((type) => Follow, (follow) => follow.following)
  followings: Follow[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
