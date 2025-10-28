import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Match, MatchStatus } from '../../database/entities/match.entity';
import { Connection, ConnectionStatus } from '../../database/entities/connection.entity';
import { VIPSpinDto, MatchResponseDto, VIPStatsDto } from '../../common/dto/vip.dto';

@Injectable()
export class VipService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
  ) {}

  async performVIPSpin(userId: string, spinDto: VIPSpinDto): Promise<MatchResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user can spin
    if (!user.canSpin) {
      throw new BadRequestException('No spins available. Upgrade to VIP for unlimited spins.');
    }

    // Get existing matches to exclude
    const existingMatches = await this.matchRepository.find({
      where: [
        { userId },
        { matchedUserId: userId },
      ],
    });

    const excludedUserIds = [
      userId,
      ...existingMatches.map(m => m.userId === userId ? m.matchedUserId : m.userId),
    ];

    // Build query for potential matches
    let query = this.userRepository
      .createQueryBuilder('user')
      .where('user.id != :userId', { userId })
      .andWhere('user.id NOT IN (:...excludedIds)', { excludedIds: excludedUserIds })
      .andWhere('user.status = :status', { status: 'active' });

    // Apply preferences
    if (spinDto.preferences) {
      const { ageMin, ageMax, interests, location } = spinDto.preferences;

      if (ageMin) {
        query = query.andWhere('user.age >= :ageMin', { ageMin });
      }
      if (ageMax) {
        query = query.andWhere('user.age <= :ageMax', { ageMax });
      }
      if (interests && interests.length > 0) {
        query = query.andWhere('user.interests && :interests', { interests });
      }
    }

    // Get potential matches
    const potentialMatches = await query
      .orderBy('RANDOM()')
      .limit(10)
      .getMany();

    if (potentialMatches.length === 0) {
      throw new NotFoundException('No matches found. Try again later or adjust your preferences.');
    }

    // Select random match
    const matchedUser = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];

    // Create match record
    const match = this.matchRepository.create({
      userId,
      matchedUserId: matchedUser.id,
      status: MatchStatus.PENDING,
      preferences: spinDto.preferences,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    const savedMatch = await this.matchRepository.save(match);

    // Update user's spin count
    if (!user.isVipActive) {
      user.freeSpins -= 1;
    }
    user.totalSpins += 1;
    user.lastActiveAt = new Date();
    await this.userRepository.save(user);

    return {
      id: savedMatch.id,
      userId: savedMatch.userId,
      matchedUserId: savedMatch.matchedUserId,
      status: savedMatch.status,
      matchedUser: {
        id: matchedUser.id,
        name: matchedUser.name,
        age: matchedUser.age,
        bio: matchedUser.bio,
        interests: matchedUser.interests,
        image: matchedUser.image,
      },
      createdAt: savedMatch.createdAt,
    };
  }

  async acceptMatch(userId: string, matchId: string): Promise<{ message: string; connectionId: string }> {
    const match = await this.matchRepository.findOne({
      where: {
        id: matchId,
        status: MatchStatus.PENDING,
      },
      relations: ['user', 'matchedUser'],
    });

    if (!match) {
      throw new NotFoundException('Match not found or already processed');
    }

    // Check if user is part of this match
    if (match.userId !== userId && match.matchedUserId !== userId) {
      throw new BadRequestException('You are not part of this match');
    }

    // Update match status
    match.status = MatchStatus.ACCEPTED;
    match.acceptedAt = new Date();
    await this.matchRepository.save(match);

    // Create connection
    const connection = this.connectionRepository.create({
      userId: match.userId,
      connectedUserId: match.matchedUserId,
      status: ConnectionStatus.ACTIVE,
    });

    const savedConnection = await this.connectionRepository.save(connection);

    return {
      message: 'Match accepted successfully',
      connectionId: savedConnection.id,
    };
  }

  async rejectMatch(userId: string, matchId: string): Promise<{ message: string }> {
    const match = await this.matchRepository.findOne({
      where: {
        id: matchId,
        status: MatchStatus.PENDING,
      },
    });

    if (!match) {
      throw new NotFoundException('Match not found or already processed');
    }

    // Check if user is part of this match
    if (match.userId !== userId && match.matchedUserId !== userId) {
      throw new BadRequestException('You are not part of this match');
    }

    // Update match status
    match.status = MatchStatus.REJECTED;
    match.rejectedAt = new Date();
    await this.matchRepository.save(match);

    return { message: 'Match rejected' };
  }

  async getMatches(userId: string): Promise<MatchResponseDto[]> {
    const matches = await this.matchRepository.find({
      where: [
        { userId },
        { matchedUserId: userId },
      ],
      relations: ['user', 'matchedUser'],
      order: { createdAt: 'DESC' },
    });

    return matches.map(match => ({
      id: match.id,
      userId: match.userId,
      matchedUserId: match.matchedUserId,
      status: match.status,
      matchedUser: {
        id: match.matchedUser.id,
        name: match.matchedUser.name,
        age: match.matchedUser.age,
        bio: match.matchedUser.bio,
        interests: match.matchedUser.interests,
        image: match.matchedUser.image,
      },
      createdAt: match.createdAt,
    }));
  }

  async getConnections(userId: string): Promise<any[]> {
    const connections = await this.connectionRepository.find({
      where: [
        { userId, status: ConnectionStatus.ACTIVE },
        { connectedUserId: userId, status: ConnectionStatus.ACTIVE },
      ],
      relations: ['user', 'connectedUser'],
      order: { lastMessageAt: 'DESC' },
    });

    return connections.map(connection => ({
      id: connection.id,
      userId: connection.userId,
      connectedUserId: connection.connectedUserId,
      status: connection.status,
      connectedUser: {
        id: connection.connectedUser.id,
        name: connection.connectedUser.name,
        image: connection.connectedUser.image,
        isOnline: connection.connectedUser.isOnline,
      },
      messageCount: connection.messageCount,
      videoCallCount: connection.videoCallCount,
      lastMessageAt: connection.lastMessageAt,
      createdAt: connection.createdAt,
    }));
  }

  async getVIPStats(userId: string): Promise<VIPStatsDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [matchCount, connectionCount] = await Promise.all([
      this.matchRepository.count({
        where: [
          { userId },
          { matchedUserId: userId },
        ],
      }),
      this.connectionRepository.count({
        where: [
          { userId, status: ConnectionStatus.ACTIVE },
          { connectedUserId: userId, status: ConnectionStatus.ACTIVE },
        ],
      }),
    ]);

    return {
      totalSpins: user.totalSpins,
      freeSpins: user.freeSpins,
      isVip: user.isVipActive,
      vipLevel: user.vipLevel,
      totalMatches: matchCount,
      totalConnections: connectionCount,
      vipExpiresAt: user.vipExpiresAt,
      giftCredits: user.giftCredits,
    };
  }
}
