import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '../../common/dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Request() req): Promise<{ message: string }> {
    await this.authService.logout(req.user.id);
    return { message: 'Successfully logged out' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      status: req.user.status,
      isVip: req.user.isVip,
      vipLevel: req.user.vipLevel,
      vipExpiresAt: req.user.vipExpiresAt,
      freeSpins: req.user.freeSpins,
      totalSpins: req.user.totalSpins,
      giftCredits: req.user.giftCredits,
      lastActiveAt: req.user.lastActiveAt,
      createdAt: req.user.createdAt,
    };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Invalid current password' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    // Implementation for password change
    return { message: 'Password change functionality to be implemented' };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // Implementation for forgot password
    return { message: 'Password reset functionality to be implemented' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Implementation for password reset
    return { message: 'Password reset functionality to be implemented' };
  }
}
