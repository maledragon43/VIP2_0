import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Reaction } from './reaction.entity';

export enum PostType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.TEXT,
  })
  type: PostType;

  @Column({ default: false })
  isStory: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @Column({ default: 0 })
  shareCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  // Virtual properties
  get isExpired(): boolean {
    if (!this.isStory || !this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  get isActive(): boolean {
    return !this.isExpired;
  }
}
