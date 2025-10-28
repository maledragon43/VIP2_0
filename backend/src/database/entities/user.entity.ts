import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Match } from './match.entity';
import { Connection } from './connection.entity';
import { Post } from './post.entity';
import { Reaction } from './reaction.entity';
import { Gift } from './gift.entity';
import { Payment } from './payment.entity';

export enum UserRole {
  USER = 'user',
  VIP = 'vip',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, unique: true })
  @Index()
  phone: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column('text', { array: true, default: [] })
  interests: string[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ default: 0 })
  vipLevel: number;

  @Column({ default: false })
  isVip: boolean;

  @Column({ type: 'timestamp', nullable: true })
  vipExpiresAt: Date;

  @Column({ default: 5 })
  freeSpins: number;

  @Column({ default: 0 })
  totalSpins: number;

  @Column({ default: 0 })
  giftCredits: number;

  @Column({ default: 0 })
  totalGiftsReceived: number;

  @Column({ default: 0 })
  totalGiftsSent: number;

  @Column({ type: 'timestamp', nullable: true })
  lastActiveAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Match, (match) => match.user)
  matches: Match[];

  @OneToMany(() => Match, (match) => match.matchedUser)
  matchedBy: Match[];

  @OneToMany(() => Connection, (connection) => connection.user)
  connections: Connection[];

  @OneToMany(() => Connection, (connection) => connection.connectedUser)
  connectedBy: Connection[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => Gift, (gift) => gift.sender)
  sentGifts: Gift[];

  @OneToMany(() => Gift, (gift) => gift.receiver)
  receivedGifts: Gift[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  // Virtual properties
  get isOnline(): boolean {
    if (!this.lastActiveAt) return false;
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.lastActiveAt > fiveMinutesAgo;
  }

  get isVipActive(): boolean {
    if (!this.isVip) return false;
    if (!this.vipExpiresAt) return true;
    return this.vipExpiresAt > new Date();
  }

  get canSpin(): boolean {
    return this.freeSpins > 0 || this.isVipActive;
  }
}
