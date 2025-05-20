// src/presentation/controllers/analytics.controller.ts
import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { GetSalesAnalyticsUseCase } from '../../application/use-cases/analytics/get-sales-analytics.use-case';
import { GetCustomerAnalyticsUseCase } from '../../application/use-cases/analytics/get-customer-analytics.use-case';
import { GetProductAnalyticsUseCase } from '../../application/use-cases/analytics/get-product-analytics.use-case';
import { GetOrderAnalyticsUseCase } from '../../application/use-cases/analytics/get-order-analytics.use-case';
import { AnalyticsFilterDto } from '../../application/dtos/analytics.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private getSalesAnalyticsUseCase: GetSalesAnalyticsUseCase,
    private getCustomerAnalyticsUseCase: GetCustomerAnalyticsUseCase,
    private getProductAnalyticsUseCase: GetProductAnalyticsUseCase,
    private getOrderAnalyticsUseCase: GetOrderAnalyticsUseCase,
  ) {}

  @Get('sales')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async getSales(@Query() dto: AnalyticsFilterDto, @Req() req) {
    return this.getSalesAnalyticsUseCase.execute(
      dto,
      req.user.id,
      req.user.role,
    );
  }

  @Get('customers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async getCustomers(@Query() dto: AnalyticsFilterDto, @Req() req) {
    return this.getCustomerAnalyticsUseCase.execute(
      dto,
      req.user.id,
      req.user.role,
    );
  }

  @Get('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async getProducts(@Query() dto: AnalyticsFilterDto, @Req() req) {
    return this.getProductAnalyticsUseCase.execute(
      dto,
      req.user.id,
      req.user.role,
    );
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async getOrders(@Query() dto: AnalyticsFilterDto, @Req() req) {
    return this.getOrderAnalyticsUseCase.execute(
      dto,
      req.user.id,
      req.user.role,
    );
  }
}
