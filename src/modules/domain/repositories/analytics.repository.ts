// src/domain/repositories/analytics.repository.ts
export interface IAnalyticsRepository {
  getSalesAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    shopId?: string;
    vendorId?: string;
  }): Promise<{
    totalRevenue: number;
    orderCount: number;
    averageOrderValue: number;
  }>;

  getCustomerAnalytics(filters: {
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
  }>;

  getProductAnalytics(filters: {
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
  }>;

  getOrderAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    shopId?: string;
    vendorId?: string;
  }): Promise<{
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  }>;
}
