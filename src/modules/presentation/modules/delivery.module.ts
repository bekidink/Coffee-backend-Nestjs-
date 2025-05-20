// src/presentation/modules/delivery.module.ts
import { Module } from '@nestjs/common';
import { DeliveryController } from '../controllers/delivery.controller';
import { CreateDeliveryUseCase } from '../../application/use-cases/delivery/create-delivery.use-case';
import { UpdateDeliveryStatusUseCase } from '../../application/use-cases/delivery/update-delivery-status.use-case';
import { TrackDeliveryUseCase } from '../../application/use-cases/delivery/track-delivery.use-case';
import { ListDeliveriesUseCase } from '../../application/use-cases/delivery/list-deliveries.use-case';
import { PrismaDeliveryRepository } from '../../infrastructure/repositories/prisma-delivery.repository';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { ShippoService } from '../../infrastructure/shippo/shippo.service';
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
  controllers: [DeliveryController],
  providers: [
    CreateDeliveryUseCase,
    UpdateDeliveryStatusUseCase,
    TrackDeliveryUseCase,
    ListDeliveriesUseCase,
    SendNotificationUseCase,
    ShippoService,
    NotificationService,
    PrismaService,
    {
      provide: 'IDeliveryRepository',
      useClass: PrismaDeliveryRepository,
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
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class DeliveryModule {}
