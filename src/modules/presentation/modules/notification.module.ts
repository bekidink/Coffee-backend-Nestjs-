// src/presentation/modules/notification.module.ts
import { Module } from '@nestjs/common';
import { NotificationController } from '../controllers/notification.controller';
import { SendNotificationUseCase } from '../../application/use-cases/notification/send-notification.use-case';
import { SendBroadcastNotificationUseCase } from '../../application/use-cases/notification/send-broadcast-notification.use-case';
import { ListNotificationsUseCase } from '../../application/use-cases/notification/list-notifications.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/notification/mark-notification-as-read.use-case';
import { PrismaNotificationRepository } from '../../infrastructure/repositories/prisma-notification.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
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
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    SendBroadcastNotificationUseCase,
    ListNotificationsUseCase,
    MarkNotificationAsReadUseCase,
    NotificationService,
    PrismaService,
    {
      provide: 'INotificationRepository',
      useClass: PrismaNotificationRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
  ],
})
export class NotificationModule {}
