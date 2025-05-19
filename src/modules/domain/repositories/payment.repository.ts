// src/domain/repositories/payment.repository.ts
import { Payment } from '../entities/payment.entity';

export interface IPaymentRepository {
  save(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByOrderId(orderId: string): Promise<Payment | null>;
  findByCustomerId(customerId: string): Promise<Payment[]>;
  update(payment: Payment): Promise<Payment>;
}
