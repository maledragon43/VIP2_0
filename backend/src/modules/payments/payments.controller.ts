import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @ApiOperation({ summary: 'Create Stripe payment intent' })
  @ApiResponse({ status: 201, description: 'Payment intent created successfully' })
  async createPaymentIntent(
    @Request() req,
    @Body() body: { amount: number; type: string },
  ) {
    return this.paymentsService.createPaymentIntent(req.user.id, body.amount, body.type as any);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirm payment' })
  @ApiResponse({ status: 200, description: 'Payment confirmed successfully' })
  async confirmPayment(@Body() body: { paymentId: string }) {
    await this.paymentsService.confirmPayment(body.paymentId);
    return { message: 'Payment confirmed successfully' };
  }
}
