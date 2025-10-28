import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { User } from '../../database/entities/user.entity';
import { Payment, PaymentType, PaymentStatus } from '../../database/entities/payment.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(userId: string, amount: number, type: PaymentType): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId,
        type,
      },
    });

    // Save payment record
    const payment = this.paymentRepository.create({
      userId,
      amount,
      type,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id,
    });

    await this.paymentRepository.save(payment);

    return {
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    };
  }

  async confirmPayment(paymentId: string): Promise<void> {
    const payment = await this.paymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
      throw new Error('Payment not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      payment.status = PaymentStatus.COMPLETED;
      payment.completedAt = new Date();
      
      // Apply payment benefits
      await this.applyPaymentBenefits(payment);
      
      await this.paymentRepository.save(payment);
    }
  }

  private async applyPaymentBenefits(payment: Payment): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: payment.userId } });
    if (!user) return;

    switch (payment.type) {
      case PaymentType.VIP_SUBSCRIPTION:
        user.isVip = true;
        user.vipLevel = Math.max(user.vipLevel, 1);
        user.vipExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        break;
      
      case PaymentType.SPINS_PACKAGE:
        if (payment.amount === 1.0) user.freeSpins += 5;
        else if (payment.amount === 5.0) user.freeSpins += 30;
        else if (payment.amount === 10.0) user.freeSpins += 70;
        else if (payment.amount === 20.0) user.freeSpins += 150;
        break;
      
      case PaymentType.GIFT_PURCHASE:
        user.giftCredits += Math.floor(payment.amount * 10); // $1 = 10 credits
        break;
    }

    await this.userRepository.save(user);
  }
}
