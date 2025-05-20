// src/presentation/modules/promotion.module.ts
import { Module } from '@nestjs/common';
import { PromotionController } from '../controllers/promotion.controller';
import { CreatePromotionUseCase } from '../../application/use-cases/promotion/create-promotion.use-case';
import { ApplyPromotionUseCase } from '../../application/use-cases/promotion/apply-promotion.use-case';
import { DeactivatePromotionUseCase } from '../../application/use-cases/promotion/deactivate-promotion.use-case';
import { ListPromotionsUseCase } from '../../application/use-cases/promotion/list-promotions.use-case';
import { ValidatePromotionUseCase } from '../../application/use-cases/promotion/validate-promotion.use-case';
import { PrismaPromotionRepository } from '../../infrastructure/repositories/prisma-promotion.repository';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { SendNotificationUseCase } from '../../application/use-cases/notification/send-notification.use-case';
import { PrismaNotificationRepository } from '../../infrastructure/repositories/prisma-notification.repository';
import { NotificationService } from '../../infrastructure/notification/notification.service';
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
  controllers: [PromotionController],
  providers: [
    CreatePromotionUseCase,
    ApplyPromotionUseCase,
    DeactivatePromotionUseCase,
    ListPromotionsUseCase,
    ValidatePromotionUseCase,
    SendNotificationUseCase,
    NotificationService,
    PrismaService,
    {
      provide: 'IPromotionRepository',
      useClass: PrismaPromotionRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class PromotionModule {}
