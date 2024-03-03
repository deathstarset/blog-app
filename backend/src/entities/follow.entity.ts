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
@Entity()
@Unique(['followerId', 'followingId'])
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followerId' })
  follower: User;
  @Column({ nullable: false })
  followerId: string;

  @ManyToOne((type) => User, (user) => user.followings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followingId' })
  following: User;
  @Column({ nullable: false })
  followingId: string;

  @CreateDateColumn({ update: false, nullable: false })
  createdAt: Date;
}
