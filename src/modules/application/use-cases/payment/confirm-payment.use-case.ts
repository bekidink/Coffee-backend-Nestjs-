// src/application/use-cases/payment/confirm-payment.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../../domain/repositories/payment.repository';
import { ConfirmPaymentDto } from '../../dtos/payment.dto';
import { StripeService } from '../../../infrastructure/stripe/stripe.service';
import { Payment } from 'src/modules/domain/entities/payment.entity';

@Injectable()
export class ConfirmPaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private stripeService: StripeService,
  ) {}

  async execute(dto: ConfirmPaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.findById(dto.paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    const paymentIntent = await this.stripeService.confirmPaymentIntent(
      dto.transactionId,
    );
    if (paymentIntent.status === 'succeeded') {
      payment.complete(dto.transactionId);
    } else {
      payment.fail();
    }

    return this.paymentRepository.update(payment);
  }
}
