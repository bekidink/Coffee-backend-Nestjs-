import { Payment } from '../domain/payment.entity';
import { PaymentRepository } from '../domain/payment-repository.interface';

export interface GetPaymentUseCase {
  execute(id: string): Promise<Payment>;
}

export class GetPaymentUseCaseImpl implements GetPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }
}
