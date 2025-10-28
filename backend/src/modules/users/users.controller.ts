import { Controller, Get, Put, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.id, updateData);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  async searchUsers(@Query('q') query: string, @Query('limit') limit: number = 20) {
    return this.usersService.searchUsers(query, limit);
  }
}
