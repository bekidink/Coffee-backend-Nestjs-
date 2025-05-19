// src/application/use-cases/payment/refund-payment.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../../domain/repositories/payment.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { RefundPaymentDto } from '../../dtos/payment.dto';
import { StripeService } from '../../../infrastructure/stripe/stripe.service';
import { Payment } from 'src/modules/domain/entities/payment.entity';

@Injectable()
export class RefundPaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderRepository: IOrderRepository,
    private stripeService: StripeService,
  ) {}

  async execute(dto: RefundPaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.findById(dto.paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    const order = await this.orderRepository.findById(payment.orderId);
    if (!order || order.status !== 'CANCELLED') {
      throw new Error('Order must be cancelled to process refund');
    }

    await this.stripeService.refundPayment(payment.transactionId!);
    payment.refund();
    return this.paymentRepository.update(payment);
  }
}
