import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);
    
    Object.assign(user, updateData);
    user.updatedAt = new Date();
    
    return this.userRepository.save(user);
  }

  async searchUsers(query: string, limit: number = 20): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.name ILIKE :query OR user.email ILIKE :query', {
        query: `%${query}%`,
      })
      .limit(limit)
      .getMany();
  }
}
