import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AnalyticsRepository } from '../domain/analytics-repository.interface';
import { OrderTypeOrmEntity } from '../../order/infrastructure/order-typeorm.entity';

@Injectable()
export class AnalyticsTypeOrmRepository implements AnalyticsRepository {
  constructor(
    @InjectRepository(OrderTypeOrmEntity)
    private readonly orderRepository: Repository<OrderTypeOrmEntity>,
  ) {}

  async getSalesReport(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
  }> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .where('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere(shopId ? 'order.shopId = :shopId' : '1=1', { shopId });

    const [orders, count] = await query.getManyAndCount();
    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const averageOrderValue = count > 0 ? totalSales / count : 0;

    return { totalSales, orderCount: count, averageOrderValue };
  }

  async getCustomerActivity(
    userId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      userId: string;
      orderCount: number;
      totalSpent: number;
    }[]
  > {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .select('order.userId', 'userId')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('SUM(order.totalAmount)', 'totalSpent')
      .where('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere(userId ? 'order.userId = :userId' : '1=1', { userId })
      .groupBy('order.userId');

    const result = await query.getRawMany();
    return result.map((row) => ({
      userId: row.userId,
      orderCount: parseInt(row.orderCount, 10),
      totalSpent: parseFloat(row.totalSpent || 0),
    }));
  }

  async getShopPerformance(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      shopId: string;
      orderCount: number;
      totalRevenue: number;
    }[]
  > {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .select('order.shopId', 'shopId')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('SUM(order.totalAmount)', 'totalRevenue')
      .where('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere(shopId ? 'order.shopId = :shopId' : '1=1', { shopId })
      .groupBy('order.shopId');

    const result = await query.getRawMany();
    return result.map((row) => ({
      shopId: row.shopId,
      orderCount: parseInt(row.orderCount, 10),
      totalRevenue: parseFloat(row.totalRevenue || 0),
    }));
  }
}
