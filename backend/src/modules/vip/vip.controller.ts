import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VipService } from './vip.service';
import { VIPSpinDto, MatchResponseDto, AcceptMatchDto, RejectMatchDto, VIPStatsDto } from '../../common/dto/vip.dto';

@ApiTags('VIP Features')
@Controller('vip')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Post('spin')
  @ApiOperation({ summary: 'Perform VIP Spin to find a match' })
  @ApiResponse({
    status: 201,
    description: 'VIP Spin completed successfully',
    type: MatchResponseDto,
  })
  @ApiResponse({ status: 400, description: 'No spins available' })
  @ApiResponse({ status: 404, description: 'No matches found' })
  async performVIPSpin(
    @Request() req,
    @Body() spinDto: VIPSpinDto,
  ): Promise<MatchResponseDto> {
    return this.vipService.performVIPSpin(req.user.id, spinDto);
  }

  @Post('matches/:matchId/accept')
  @ApiOperation({ summary: 'Accept a match' })
  @ApiResponse({
    status: 200,
    description: 'Match accepted successfully',
  })
  @ApiResponse({ status: 404, description: 'Match not found' })
  @ApiResponse({ status: 400, description: 'Invalid match' })
  async acceptMatch(
    @Request() req,
    @Param('matchId') matchId: string,
  ): Promise<{ message: string; connectionId: string }> {
    return this.vipService.acceptMatch(req.user.id, matchId);
  }

  @Post('matches/:matchId/reject')
  @ApiOperation({ summary: 'Reject a match' })
  @ApiResponse({
    status: 200,
    description: 'Match rejected successfully',
  })
  @ApiResponse({ status: 404, description: 'Match not found' })
  @ApiResponse({ status: 400, description: 'Invalid match' })
  async rejectMatch(
    @Request() req,
    @Param('matchId') matchId: string,
  ): Promise<{ message: string }> {
    return this.vipService.rejectMatch(req.user.id, matchId);
  }

  @Get('matches')
  @ApiOperation({ summary: 'Get user matches' })
  @ApiResponse({
    status: 200,
    description: 'Matches retrieved successfully',
    type: [MatchResponseDto],
  })
  async getMatches(@Request() req): Promise<MatchResponseDto[]> {
    return this.vipService.getMatches(req.user.id);
  }

  @Get('connections')
  @ApiOperation({ summary: 'Get user connections' })
  @ApiResponse({
    status: 200,
    description: 'Connections retrieved successfully',
  })
  async getConnections(@Request() req): Promise<any[]> {
    return this.vipService.getConnections(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get VIP statistics' })
  @ApiResponse({
    status: 200,
    description: 'VIP stats retrieved successfully',
    type: VIPStatsDto,
  })
  async getVIPStats(@Request() req): Promise<VIPStatsDto> {
    return this.vipService.getVIPStats(req.user.id);
  }
}
