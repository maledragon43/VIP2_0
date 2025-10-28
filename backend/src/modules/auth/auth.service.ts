import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from '../../database/entities/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto } from '../../common/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      ...userData,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(savedUser);

    return {
      ...tokens,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role,
        status: savedUser.status,
        isVip: savedUser.isVip,
        vipLevel: savedUser.vipLevel,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    // Update last login
    user.lastLoginAt = new Date();
    user.lastActiveAt = new Date();
    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        isVip: user.isVip,
        vipLevel: user.vipLevel,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          isVip: user.isVip,
          vipLevel: user.vipLevel,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  private async generateTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Save refresh token to database
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(
      refreshTokenExpiresAt.getDate() + 7, // 7 days
    );

    await this.userRepository.update(user.id, {
      refreshToken,
      refreshTokenExpiresAt,
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'bearer',
      expiresIn: 3600, // 1 hour
    };
  }
}
