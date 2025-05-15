import { Payment } from '../domain/payment.entity';
import { PaymentRepository } from '../domain/payment-repository.interface';

export interface UpdatePaymentUseCase {
  execute(
    id: string,
    dto: { status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' },
  ): Promise<Payment>;
}

export class UpdatePaymentUseCaseImpl implements UpdatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(
    id: string,
    dto: { status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' },
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (dto.status) {
      payment.status = dto.status;
    }

    payment.updatedAt = new Date();
    await this.paymentRepository.update(payment);
    return payment;
  }
}
