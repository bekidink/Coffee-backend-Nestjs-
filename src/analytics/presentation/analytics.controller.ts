import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetSalesReportUseCase } from '../application/get-sales-report.usecase';
import { GetCustomerActivityUseCase } from '../application/get-customer-activity.usecase';
import { GetShopPerformanceUseCase } from '../application/get-shop-performance.usecase';
import { ReportQueryDto } from './dto/report-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly getSalesReportUseCase: GetSalesReportUseCase,
    private readonly getCustomerActivityUseCase: GetCustomerActivityUseCase,
    private readonly getShopPerformanceUseCase: GetShopPerformanceUseCase,
  ) {}

  @Get('sales')
  @UseGuards(JwtAuthGuard)
  async getSalesReport(@Query() query: ReportQueryDto) {
    const { shopId, startDate, endDate } = query;
    return this.getSalesReportUseCase.execute(shopId || null, new Date(startDate), new Date(endDate));
  }

  @Get('customer-activity')
  @UseGuards(JwtAuthGuard)
  async getCustomerActivity(@Query() query: ReportQueryDto) {
    const { userId, startDate, endDate } = query;
    return this.getCustomerActivityUseCase.execute(userId || null, new Date(startDate), new Date(endDate));
  }

  @Get('shop-performance')
  @UseGuards(JwtAuthGuard)
  async getShopPerformance(@Query() query: ReportQueryDto) {
    const { shopId, startDate, endDate } = query;
    return this.getShopPerformanceUseCase.execute(shopId || null, new Date(startDate), new Date(endDate));
  }
}