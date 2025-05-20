import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadService } from './modules/infrastructure/services/image-upload.service';
import { PrismaCategoryRepository } from './modules/infrastructure/repositories/prisma-category.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnalyticsRepository } from './modules/infrastructure/repositories/prisma-analytics.repository';
import { PrismaAddressRepository } from './modules/infrastructure/repositories/prisma-address.repository';
import { PrismaCustomerRepository } from './modules/infrastructure/repositories/prisma-customer.repository';
import { PrismaDeliveryRepository } from './modules/infrastructure/repositories/prisma-delivery.repository';
import { PrismaInventoryRepository } from './modules/infrastructure/repositories/prisma-inventory.repository';
import { PrismaShopRepository } from './modules/infrastructure/repositories/prisma-product.repository';
import { PrismaPromotionRepository } from './modules/infrastructure/repositories/prisma-promotion.repository';
import { PrismaNotificationRepository } from './modules/infrastructure/repositories/prisma-notification.repository';
import { PrismaOrderRepository } from './modules/infrastructure/repositories/prisma-order.repository';
import { PrismaPaymentRepository } from './modules/infrastructure/repositories/prisma-payment.repository';
import { PrismaReviewRepository } from './modules/infrastructure/repositories/prisma-review.repository';
import { PrismaSearchRepository } from './modules/infrastructure/repositories/prisma-search.repository';
import { PrismaVendorRepository } from './modules/infrastructure/repositories/prisma-vendor.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Optional temporary storage
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PrismaCategoryRepository,
    PrismaShopRepository,

    ImageUploadService,
    {
      provide: 'ICategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
    {
      provide: 'IPromotionRepository',
      useClass: PrismaPromotionRepository,
    },
    {
      provide: 'IAddressRepository',
      useClass: PrismaAddressRepository,
    },
    {
      provide: 'IAnalyticsRepository',
      useClass: PrismaAnalyticsRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'IDeliveryRepository',
      useClass: PrismaDeliveryRepository,
    },
    {
      provide: 'IInventoryRepository',
      useClass: PrismaInventoryRepository,
    },
    {
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'IPaymentRepository',
      useClass: PrismaPaymentRepository,
    },
    {
      provide: 'IReviewRepository',
      useClass: PrismaReviewRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'ISearchRepository',
      useClass: PrismaSearchRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
  
  ],
  exports: [PrismaCategoryRepository, ImageUploadService],
})
export class AppModule {}
