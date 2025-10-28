import { IsOptional, IsObject, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from '../../database/entities/match.entity';

export class VIPSpinDto {
  @ApiProperty({ 
    description: 'Matching preferences',
    example: { ageMin: 18, ageMax: 35, interests: ['Music', 'Travel'] },
    required: false 
  })
  @IsOptional()
  @IsObject()
  preferences?: {
    ageMin?: number;
    ageMax?: number;
    interests?: string[];
    location?: string;
    gender?: string;
  };
}

export class MatchResponseDto {
  @ApiProperty({ example: 'match_uuid_here' })
  id: string;

  @ApiProperty({ example: 'user_uuid_here' })
  userId: string;

  @ApiProperty({ example: 'matched_user_uuid_here' })
  matchedUserId: string;

  @ApiProperty({ enum: MatchStatus })
  status: MatchStatus;

  @ApiProperty()
  matchedUser: {
    id: string;
    name: string;
    age: number;
    bio: string;
    interests: string[];
    image: string;
  };

  @ApiProperty()
  createdAt: Date;
}

export class AcceptMatchDto {
  @ApiProperty({ example: 'match_uuid_here' })
  @IsUUID()
  matchId: string;
}

export class RejectMatchDto {
  @ApiProperty({ example: 'match_uuid_here' })
  @IsUUID()
  matchId: string;
}

export class VIPStatsDto {
  @ApiProperty({ example: 50 })
  totalSpins: number;

  @ApiProperty({ example: 5 })
  freeSpins: number;

  @ApiProperty({ example: true })
  isVip: boolean;

  @ApiProperty({ example: 2 })
  vipLevel: number;

  @ApiProperty({ example: 25 })
  totalMatches: number;

  @ApiProperty({ example: 15 })
  totalConnections: number;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  vipExpiresAt: Date;

  @ApiProperty({ example: 100 })
  giftCredits: number;
}
