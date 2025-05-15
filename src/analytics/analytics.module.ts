import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AnalyticsController } from './presentation/analytics.controller';
import { GetSalesReportUseCaseImpl } from './application/get-sales-report.usecase';
import { GetCustomerActivityUseCaseImpl } from './application/get-customer-activity.usecase';
import { GetShopPerformanceUseCaseImpl } from './application/get-shop-performance.usecase';
import { AnalyticsTypeOrmRepository } from './infrastructure/analytics-typeorm.repository';
import { OrderTypeOrmEntity } from './infrastructure/order-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_analytics',
      entities: [OrderTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AnalyticsController],
  providers: [
    {
      provide: 'GetSalesReportUseCase',
      useClass: GetSalesReportUseCaseImpl,
    },
    {
      provide: 'GetCustomerActivityUseCase',
      useClass: GetCustomerActivityUseCaseImpl,
    },
    {
      provide: 'GetShopPerformanceUseCase',
      useClass: GetShopPerformanceUseCaseImpl,
    },
    {
      provide: 'AnalyticsRepository',
      useClass: AnalyticsTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class AnalyticsModule {}
