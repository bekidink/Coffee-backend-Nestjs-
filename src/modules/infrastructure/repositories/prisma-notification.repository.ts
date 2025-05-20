// src/infrastructure/repositories/prisma-notification.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { INotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private prisma: PrismaService) {}

  async save(notification: Notification): Promise<Notification> {
    const data = await this.prisma.notification.create({
      data: {
        id: notification.id,
        userId: notification.userId,
        userType: notification.userType,
        type: notification.type,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
        // updatedAt: notification.updatedAt,
      },
    });
    return Notification.create(data);
  }

  async findById(id: string): Promise<Notification | null> {
    const data = await this.prisma.notification.findUnique({ where: { id } });
    return data ? Notification.create(data) : null;
  }

  async findByUserId(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<Notification[]> {
    const data = await this.prisma.notification.findMany({
      where: { userId, userType },
    });
    return data.map((item) => Notification.create(item));
  }

  async findUnreadByUserId(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<Notification[]> {
    const data = await this.prisma.notification.findMany({
      where: { userId, userType, isRead: false },
    });
    return data.map((item) => Notification.create(item));
  }

  async update(notification: Notification): Promise<Notification> {
    const data = await this.prisma.notification.update({
      where: { id: notification.id },
      data: {
        isRead: notification.isRead,
        // updatedAt: notification.updatedAt,
      },
    });
    return Notification.create(data);
  }
}
