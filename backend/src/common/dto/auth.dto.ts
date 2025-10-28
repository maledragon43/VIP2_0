import { IsEmail, IsString, MinLength, IsOptional, IsArray, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../database/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ example: 'Love traveling and meeting new people!', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: ['Travel', 'Music', 'Photography'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token_here' })
  @IsString()
  refreshToken: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'old_password123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'new_password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'reset_token_here' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'new_password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt_access_token_here' })
  accessToken: string;

  @ApiProperty({ example: 'jwt_refresh_token_here' })
  refreshToken: string;

  @ApiProperty({ example: 'bearer' })
  tokenType: string;

  @ApiProperty({ example: 3600 })
  expiresIn: number;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
    isVip: boolean;
    vipLevel: number;
  };
}
