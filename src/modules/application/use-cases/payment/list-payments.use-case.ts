// src/application/use-cases/payment/list-payments.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../../domain/repositories/payment.repository';
import { Payment } from '../../../domain/entities/payment.entity';

@Injectable()
export class ListPaymentsUseCase {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(filters?: {
    customerId?: string;
    orderId?: string;
  }): Promise<Payment[]> {
    if (filters?.customerId) {
      return this.paymentRepository.findByCustomerId(filters.customerId);
    }
    if (filters?.orderId) {
      const payment = await this.paymentRepository.findByOrderId(
        filters.orderId,
      );
      return payment ? [payment] : [];
    }
    return []; // Optionally, implement findAll if needed
  }
}
