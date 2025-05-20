// src/application/use-cases/notification/mark-notification-as-read.use-case.ts
import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/repositories/notification.repository';
import { Notification } from 'src/modules/domain/entities/notification.entity';

@Injectable()
export class MarkNotificationAsReadUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notificationId: string): Promise<Notification> {
    const notification =
      await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.markAsRead();
    return this.notificationRepository.update(notification);
  }
}
