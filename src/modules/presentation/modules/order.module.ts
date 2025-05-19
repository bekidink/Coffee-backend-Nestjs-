// src/presentation/modules/order.module.ts
import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/order/update-order-status.use-case';
import { CancelOrderUseCase } from '../../application/use-cases/order/cancel-order.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/order/list-orders.use-case';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
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
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    UpdateOrderStatusUseCase,
    CancelOrderUseCase,
    ListOrdersUseCase,
    PrismaService,
    {
      provide: 'IOrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
  ],
})
export class OrderModule {}
