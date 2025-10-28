import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  FIRE = 'fire',
  LAUGH = 'laugh',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}

@Entity('reactions')
@Index(['user', 'post'], { unique: true })
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  postId: string;

  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  type: ReactionType;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
