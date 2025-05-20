// src/application/use-cases/notification/list-notifications.use-case.ts
import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/repositories/notification.repository';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class ListNotificationsUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
    unreadOnly: boolean = false,
  ): Promise<Notification[]> {
    return unreadOnly
      ? await this.notificationRepository.findUnreadByUserId(userId, userType)
      : await this.notificationRepository.findByUserId(userId, userType);
  }
}
