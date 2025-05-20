// src/infrastructure/repositories/prisma-payment.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IPaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/entities/payment.entity';

@Injectable()
export class PrismaPaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaService) {}

  async save(payment: Payment): Promise<Payment> {
    const data = await this.prisma.payment.create({
      data: {
        id: payment.id,
        orderId: payment.orderId,
        customerId: payment.customerId,
        amount: payment.amount,
        status: payment.status,
        transactionId: payment.transactionId,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });
    return Payment.create({
      id: data.id,
      orderId: data.orderId,
      customerId: data.customerId,
      amount:data.amount,
      status:data.status
    });
  }

  async findById(id: string): Promise<Payment | null> {
    const data = await this.prisma.payment.findUnique({ where: { id } });
    return data
      ? Payment.create({
          id: data.id,
          orderId: data.orderId,
          customerId: data.customerId,
          amount: data.amount,
          status: data.status,
        })
      : null;
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const data = await this.prisma.payment.findUnique({ where: { orderId } });
    return data
      ? Payment.create({
          id: data.id,
          orderId: data.orderId,
          customerId: data.customerId,
          amount: data.amount,
          status: data.status,
        })
      : null;
  }

  async findByCustomerId(customerId: string): Promise<Payment[]> {
    const data = await this.prisma.payment.findMany({ where: { customerId } });
    return data.map((item) =>
      Payment.create({
        id: item.id,
        orderId: item.orderId,
        customerId: item.customerId,
        amount: item.amount,
        status: item.status,
      }),
    );
  }

  async update(payment: Payment): Promise<Payment> {
    const data = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: payment.status,
        transactionId: payment.transactionId,
        updatedAt: payment.updatedAt,
      },
    });
    return Payment.create({
      id: data.id,
      orderId: data.orderId,
      customerId: data.customerId,
      amount: data.amount,
      status: data.status,
    });
  }
}
