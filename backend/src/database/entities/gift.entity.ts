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

export enum GiftType {
  HEART = 'heart',
  ROSE = 'rose',
  KISS = 'kiss',
  DIAMOND = 'diamond',
  CROWN = 'crown',
  STAR = 'star',
  FIRE = 'fire',
  RAINBOW = 'rainbow',
}

@Entity('gifts')
export class Gift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  senderId: string;

  @Column('uuid')
  receiverId: string;

  @Column({
    type: 'enum',
    enum: GiftType,
  })
  type: GiftType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.sentGifts)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedGifts)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;
}
