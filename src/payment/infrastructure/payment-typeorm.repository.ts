import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../domain/payment.entity';
import { PaymentRepository } from '../domain/payment-repository.interface';
import { PaymentTypeOrmEntity } from './payment-typeorm.entity';

@Injectable()
export class PaymentTypeOrmRepository implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentTypeOrmEntity)
    private readonly repository: Repository<PaymentTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Payment | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Payment(
      entity.id,
      entity.orderId,
      entity.amount,
      entity.status,
      entity.gateway,
      entity.transactionId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const entity = await this.repository.findOne({ where: { orderId } });
    if (!entity) return null;
    return new Payment(
      entity.id,
      entity.orderId,
      entity.amount,
      entity.status,
      entity.gateway,
      entity.transactionId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(payment: Payment): Promise<void> {
    await this.repository.save({
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      status: payment.status,
      gateway: payment.gateway,
      transactionId: payment.transactionId,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    });
  }

  async update(payment: Payment): Promise<void> {
    await this.repository.update(payment.id, {
      status: payment.status,
      updatedAt: payment.updatedAt,
    });
  }
}
