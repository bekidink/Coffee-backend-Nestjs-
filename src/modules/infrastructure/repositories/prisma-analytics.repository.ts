// src/infrastructure/repositorie/prisma-analytics.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IAnalyticsRepository } from '../../domain/repositories/analytics.repository';

@Injectable()
export class PrismaAnalyticsRepository implements IAnalyticsRepository {
  constructor(private prisma: PrismaService) {}

  async getSalesAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    shopId?: string;
    vendorId?: string;
  }): Promise<{
    totalRevenue: number;
    orderCount: number;
    averageOrderValue: number;
  }> {
    const where: any = { status: 'COMPLETED' };
    if (filters.startDate) where.createdAt = { gte: filters.startDate };
    if (filters.endDate)
      where.createdAt = { ...where.createdAt, lte: filters.endDate };
    if (filters.shopId) where.shopId = filters.shopId;
    if (filters.vendorId) where.shop = { vendorId: filters.vendorId };

    const orders = await this.prisma.order.aggregate({
      where,
      _sum: { totalAmount: true },
      _count: true,
      _avg: { totalAmount: true },
    });

    return {
      totalRevenue: orders._sum.totalAmount || 0,
      orderCount: orders._count,
      averageOrderValue: orders._avg.totalAmount || 0,
    };
  }

  async getCustomerAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    vendorId?: string;
  }): Promise<{
    totalCustomers: number;
    topCustomers: {
      customerId: string;
      totalSpent: number;
      orderCount: number;
    }[];
  }> {
    const where: any = { status: 'DELIVERED' };
    if (filters.startDate) where.createdAt = { gte: filters.startDate };
    if (filters.endDate)
      where.createdAt = { ...where.createdAt, lte: filters.endDate };
    if (filters.vendorId) where.shop = { vendorId: filters.vendorId };

    const totalCustomers = await this.prisma.customer.count({
      where: { orders: { some: { status: 'DELIVERED' } } },
    });

    const topCustomersRaw = await this.prisma.order.groupBy({
      by: ['customerId'],
      where,
      _sum: { totalAmount: true },
      _count: { id: true },
      orderBy: { _sum: { totalAmount: 'desc' } },
      take: 5,
    });

    const topCustomers = topCustomersRaw.map((item) => ({
      customerId: item.customerId,
      totalSpent: item._sum.totalAmount || 0,
      orderCount: item._count.id,
    }));

    return { totalCustomers, topCustomers };
  }

  async getProductAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    shopId?: string;
    vendorId?: string;
  }): Promise<{
    topProducts: {
      productId: string;
      name: string;
      unitsSold: number;
      revenue: number;
      averageRating: number;
    }[];
  }> {
    const where: any = { order: { status: 'COMPLETED' } };
    if (filters.startDate)
      where.order = { ...where.order, createdAt: { gte: filters.startDate } };
    if (filters.endDate)
      where.order = { ...where.order, createdAt: { lte: filters.endDate } };
    if (filters.shopId)
      where.order = { ...where.order, shopId: filters.shopId };
    if (filters.vendorId) where.product = { vendorId: filters.vendorId };

    const topProductsRaw = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where,
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const topProducts = await Promise.all(
      topProductsRaw.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        const avgRating = await this.prisma.review.aggregate({
          where: { productId: item.productId },
          _avg: { rating: true },
        });
        return {
          productId: item.productId,
          name: product?.name || 'Unknown',
          unitsSold: item._sum.quantity || 0,
          revenue: (item._sum.quantity || 0) * (item._sum.price || 0),
          averageRating: avgRating._avg.rating || 0,
        };
      }),
    );

    return { topProducts };
  }

  async getOrderAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    shopId?: string;
    vendorId?: string;
  }): Promise<{
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  }> {
    const where: any = {};
    if (filters.startDate) where.createdAt = { gte: filters.startDate };
    if (filters.endDate)
      where.createdAt = { ...where.createdAt, lte: filters.endDate };
    if (filters.shopId) where.shopId = filters.shopId;
    if (filters.vendorId) where.shop = { vendorId: filters.vendorId };

    const totalOrders = await this.prisma.order.count({ where });
    const completedOrders = await this.prisma.order.count({
      where: { ...where, status: 'COMPLETED' },
    });
    const cancelledOrders = await this.prisma.order.count({
      where: { ...where, status: 'CANCELLED' },
    });

    return { totalOrders, completedOrders, cancelledOrders };
  }
}
