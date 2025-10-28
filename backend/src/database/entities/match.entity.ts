import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

@Entity('matches')
@Index(['user', 'matchedUser'], { unique: true })
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  matchedUserId: string;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  status: MatchStatus;

  @Column({ type: 'jsonb', nullable: true })
  preferences: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.matches)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.matchedBy)
  @JoinColumn({ name: 'matchedUserId' })
  matchedUser: User;

  // Virtual properties
  get isExpired(): boolean {
    if (!this.expiredAt) return false;
    return new Date() > this.expiredAt;
  }

  get isActive(): boolean {
    return this.status === MatchStatus.PENDING && !this.isExpired;
  }
}
