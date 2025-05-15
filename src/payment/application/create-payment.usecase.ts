import { Payment } from '../domain/payment.entity';
import { PaymentRepository } from '../domain/payment-repository.interface';

export interface CreatePaymentUseCase {
  execute(dto: {
    orderId: string;
    amount: number;
    gateway: string;
  }): Promise<Payment>;
}

export class CreatePaymentUseCaseImpl implements CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(dto: {
    orderId: string;
    amount: number;
    gateway: string;
  }): Promise<Payment> {
    // Mock payment gateway integration (e.g., Stripe)
    const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`; // Replace with real gateway call

    const payment = new Payment(
      require('uuid').v4(),
      dto.orderId,
      dto.amount,
      'PENDING',
      dto.gateway,
      transactionId,
      new Date(),
      new Date(),
    );

    await this.paymentRepository.save(payment);
    return payment;
  }
}
