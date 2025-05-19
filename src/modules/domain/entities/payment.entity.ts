// src/domain/entities/payment.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Payment {
  private constructor(
    public readonly id: string,
    public orderId: string,
    public customerId: string,
    public amount: number,
    public status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED',
    public transactionId: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    orderId: string;
    customerId: string;
    amount: number;
    status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    transactionId?: string;
  }): Payment {
    return new Payment(
      data.id || uuidv4(),
      data.orderId,
      data.customerId,
      data.amount,
      data.status || 'PENDING',
      data.transactionId || null,
      new Date(),
      new Date(),
    );
  }

  complete(transactionId: string): void {
    if (this.status !== 'PENDING') {
      throw new Error('Payment is not in pending state');
    }
    this.status = 'COMPLETED';
    this.transactionId = transactionId;
    this.updatedAt = new Date();
  }

  fail(): void {
    if (this.status !== 'PENDING') {
      throw new Error('Payment is not in pending state');
    }
    this.status = 'FAILED';
    this.updatedAt = new Date();
  }

  refund(): void {
    if (this.status !== 'COMPLETED') {
      throw new Error('Only completed payments can be refunded');
    }
    this.status = 'REFUNDED';
    this.updatedAt = new Date();
  }
}
