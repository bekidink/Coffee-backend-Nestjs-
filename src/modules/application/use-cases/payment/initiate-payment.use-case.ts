// src/application/use-cases/payment/initiate-payment.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../../domain/repositories/payment.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { Payment } from '../../../domain/entities/payment.entity';
import { InitiatePaymentDto } from '../../dtos/payment.dto';
import { StripeService } from '../../../infrastructure/stripe/stripe.service';

@Injectable()
export class InitiatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderRepository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private stripeService: StripeService,
  ) {}

  async execute(
    dto: InitiatePaymentDto,
  ): Promise<{ payment: Payment; clientSecret: string }> {
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order || order.status !== 'PENDING') {
      throw new Error('Valid pending order required');
    }

    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer || customer.id !== order.customerId) {
      throw new Error('Valid customer required');
    }

    const payment = Payment.create({
      orderId: dto.orderId,
      customerId: dto.customerId,
      amount: order.totalAmount,
    });
    const savedPayment = await this.paymentRepository.save(payment);

    const clientSecret = await this.stripeService.createPaymentIntent(
      order.totalAmount * 100, // Convert to cents
      'usd',
      dto.paymentMethodId,
      savedPayment.id,
    );

    return { payment: savedPayment, clientSecret };
  }
}
