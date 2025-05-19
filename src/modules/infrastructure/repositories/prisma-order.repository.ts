// src/infrastructure/repositories/prisma-order.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { OrderItem } from '../../domain/entities/order-item.entity';

@Injectable()
export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaService) {}

  async save(order: Order): Promise<Order> {
    const data = await this.prisma.order.create({
      data: {
        id: order.id,
        customerId: order.customerId,
        shopId: order.shopId,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        orderItems: {
          create: order.orderItems.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })),
        },
      },
      include: { orderItems: true },
    });

    return new Order(
      data.id,
      data.customerId,
      data.shopId,
      data.totalAmount,
      data.status as any,
      data.createdAt,
      data.updatedAt,
      data.orderItems.map((item) =>
        OrderItem.create({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }),
      ),
    );
  }

  async findById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
    if (!data) return null;

    return new Order(
      data.id,
      data.customerId,
      data.shopId,
      data.totalAmount,
      data.status as any,
      data.createdAt,
      data.updatedAt,
      data.orderItems.map((item) =>
        OrderItem.create({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }),
      ),
    );
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { customerId },
      include: { orderItems: true },
    });
    return data.map(
      (item) =>
        new Order(
          item.id,
          item.customerId,
          item.shopId,
          item.totalAmount,
          item.status as any,
          item.createdAt,
          item.updatedAt,
          item.orderItems.map((oi) =>
            OrderItem.create({
              id: oi.id,
              orderId: oi.orderId,
              productId: oi.productId,
              quantity: oi.quantity,
              unitPrice: oi.unitPrice,
            }),
          ),
        ),
    );
  }

  async findByShopId(shopId: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { shopId },
      include: { orderItems: true },
    });
    return data.map(
      (item) =>
        new Order(
          item.id,
          item.customerId,
          item.shopId,
          item.totalAmount,
          item.status as any,
          item.createdAt,
          item.updatedAt,
          item.orderItems.map((oi) =>
            OrderItem.create({
              id: oi.id,
              orderId: oi.orderId,
              productId: oi.productId,
              quantity: oi.quantity,
              unitPrice: oi.unitPrice,
            }),
          ),
        ),
    );
  }

  async findAll(): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      include: { orderItems: true },
    });
    return data.map(
      (item) =>
        new Order(
          item.id,
          item.customerId,
          item.shopId,
          item.totalAmount,
          item.status as any,
          item.createdAt,
          item.updatedAt,
          item.orderItems.map((oi) =>
            OrderItem.create({
              id: oi.id,
              orderId: oi.orderId,
              productId: oi.productId,
              quantity: oi.quantity,
              unitPrice: oi.unitPrice,
            }),
          ),
        ),
    );
  }

  async update(order: Order): Promise<Order> {
    const data = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: order.status,
        updatedAt: order.updatedAt,
      },
      include: { orderItems: true },
    });

    return new Order(
      data.id,
      data.customerId,
      data.shopId,
      data.totalAmount,
      data.status as any,
      data.createdAt,
      data.updatedAt,
      data.orderItems.map((item) =>
        OrderItem.create({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }),
      ),
    );
  }
}
