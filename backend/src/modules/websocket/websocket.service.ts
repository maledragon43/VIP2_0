import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Connection, ConnectionStatus } from '../../database/entities/connection.entity';
import { Gift, GiftType } from '../../database/entities/gift.entity';

@Injectable()
export class WebSocketService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,
  ) {}

  async setUserOnline(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      lastActiveAt: new Date(),
    });
  }

  async setUserOffline(userId: string): Promise<void> {
    // Update last active time
    await this.userRepository.update(userId, {
      lastActiveAt: new Date(),
    });
  }

  async getUserConnections(userId: string): Promise<Connection[]> {
    return this.connectionRepository.find({
      where: [
        { userId, status: ConnectionStatus.ACTIVE },
        { connectedUserId: userId, status: ConnectionStatus.ACTIVE },
      ],
    });
  }

  async saveMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
    type: string;
  }): Promise<{ id: string; createdAt: Date }> {
    // In a real implementation, you would save to a messages table
    // For now, we'll return a mock response
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
  }

  async saveGift(data: {
    senderId: string;
    receiverId: string;
    type: string;
    message?: string;
  }): Promise<Gift> {
    const gift = this.giftRepository.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      type: data.type as GiftType,
      value: this.getGiftValue(data.type),
      message: data.message,
    });

    return this.giftRepository.save(gift);
  }

  private getGiftValue(giftType: string): number {
    const giftValues = {
      heart: 1.0,
      rose: 2.0,
      kiss: 3.0,
      diamond: 5.0,
      crown: 10.0,
      star: 15.0,
      fire: 20.0,
      rainbow: 50.0,
    };

    return giftValues[giftType] || 1.0;
  }

  async getOnlineUsers(): Promise<string[]> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select('user.id')
      .where('user.lastActiveAt > :fiveMinutesAgo', { fiveMinutesAgo })
      .getMany();

    return users.map(user => user.id);
  }

  async getUserStatus(userId: string): Promise<{ isOnline: boolean; lastActiveAt: Date }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['lastActiveAt'],
    });

    if (!user) {
      return { isOnline: false, lastActiveAt: null };
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const isOnline = user.lastActiveAt > fiveMinutesAgo;

    return {
      isOnline,
      lastActiveAt: user.lastActiveAt,
    };
  }
}
