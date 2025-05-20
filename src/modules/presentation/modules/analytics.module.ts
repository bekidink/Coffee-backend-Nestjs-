// src/presentation/modules/analytics.module.ts
import { Module } from '@nestjs/common';
import { AnalyticsController } from '../controllers/analytics.controller';
import { GetSalesAnalyticsUseCase } from '../../application/use-cases/analytics/get-sales-analytics.use-case';
import { GetCustomerAnalyticsUseCase } from '../../application/use-cases/analytics/get-customer-analytics.use-case';
import { GetProductAnalyticsUseCase } from '../../application/use-cases/analytics/get-product-analytics.use-case';
import { GetOrderAnalyticsUseCase } from '../../application/use-cases/analytics/get-order-analytics.use-case';
import { PrismaAnalyticsRepository } from '../../infrastructure/repositories/prisma-analytics.repository';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AnalyticsController],
  providers: [
    GetSalesAnalyticsUseCase,
    GetCustomerAnalyticsUseCase,
    GetProductAnalyticsUseCase,
    GetOrderAnalyticsUseCase,
    PrismaService,
    {
      provide: 'IAnalyticsRepository',
      useClass: PrismaAnalyticsRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
  ],
})
export class AnalyticsModule {}
