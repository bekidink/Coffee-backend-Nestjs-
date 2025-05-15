export interface AnalyticsRepository {
  getSalesReport(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
  }>;
  getCustomerActivity(
    userId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      userId: string;
      orderCount: number;
      totalSpent: number;
    }[]
  >;
  getShopPerformance(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      shopId: string;
      orderCount: number;
      totalRevenue: number;
    }[]
  >;
}
