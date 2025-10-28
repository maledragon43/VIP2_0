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

export enum ConnectionStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

@Entity('connections')
@Index(['user', 'connectedUser'], { unique: true })
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  connectedUserId: string;

  @Column({
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.ACTIVE,
  })
  status: ConnectionStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastMessageAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastVideoCallAt: Date;

  @Column({ default: 0 })
  messageCount: number;

  @Column({ default: 0 })
  videoCallCount: number;

  @Column({ default: 0 })
  giftCount: number;

  @Column({ type: 'timestamp', nullable: true })
  blockedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.connections)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.connectedBy)
  @JoinColumn({ name: 'connectedUserId' })
  connectedUser: User;

  // Virtual properties
  get isActive(): boolean {
    return this.status === ConnectionStatus.ACTIVE;
  }

  get isBlocked(): boolean {
    return this.status === ConnectionStatus.BLOCKED;
  }

  get isDeleted(): boolean {
    return this.status === ConnectionStatus.DELETED;
  }
}
