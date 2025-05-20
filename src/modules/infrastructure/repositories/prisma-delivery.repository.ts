// src/infrastructure/repositories/prisma-delivery.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IDeliveryRepository } from '../../domain/repositories/delivery.repository';
import { Delivery } from '../../domain/entities/delivery.entity';

@Injectable()
export class PrismaDeliveryRepository implements IDeliveryRepository {
  constructor(private prisma: PrismaService) {}

  async save(delivery: Delivery): Promise<Delivery> {
    const data = await this.prisma.delivery.create({
      data: {
        id: delivery.id,
        orderId: delivery.orderId,
         customerId: delivery.customerId,
         shopId: delivery.shopId,
        addressId:'',
        status: delivery.status,
         trackingNumber: delivery.trackingNumber,
         estimatedDeliveryDate: delivery.estimatedDeliveryDate,
        createdAt: delivery.createdAt,
        updatedAt: delivery.updatedAt,
      },
    });
    return Delivery.create({ orderId:data.orderId,customerId:data.customerId,shopId:data.shopId, trackingNumber :data.trackingNumber??''});
  }

  async findById(id: string): Promise<Delivery | null> {
    const data = await this.prisma.delivery.findUnique({ where: { id } });
    return data
      ? Delivery.create({
          orderId: data.orderId,
          customerId: data.customerId,
          shopId: data.shopId,
          trackingNumber: data.trackingNumber ?? '',
        })
      : null;
  }

  async findByOrderId(orderId: string): Promise<Delivery | null> {
    const data = await this.prisma.delivery.findUnique({ where: { orderId } });
    return data
      ? Delivery.create({
          orderId: data.orderId,
          customerId: data.customerId,
          shopId: data.shopId,
          trackingNumber: data.trackingNumber ?? '',
        })
      : null;
  }

  async findByCustomerId(customerId: string): Promise<Delivery[]> {
    const data = await this.prisma.delivery.findMany({ where: { customerId } });
    return data.map((item) =>
      Delivery.create({
        orderId: item.orderId,
        customerId: item.customerId,
        shopId: item.shopId,
        trackingNumber: item.trackingNumber ?? '',
      }),
    );
  }

  async findByShopId(shopId: string): Promise<Delivery[]> {
    const data = await this.prisma.delivery.findMany({ where: { shopId } });
    return data.map((item) =>
      Delivery.create({
        orderId: item.orderId,
        customerId: item.customerId,
        shopId: item.shopId,
        trackingNumber: item.trackingNumber ?? '',
      }),
    );
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const data = await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: {
        status: delivery.status,
        trackingNumber: delivery.trackingNumber,
        updatedAt: delivery.updatedAt,
      },
    });
    return Delivery.create({
      orderId: data.orderId,
      customerId: data.customerId,
      shopId: data.shopId,
      trackingNumber: data.trackingNumber ?? '',
    });
  }
}
