import { Notification } from '../domain/notification.entity';
import { NotificationRepository } from '../domain/notification-repository.interface';

export interface UpdateNotificationUseCase {
  execute(id: string, dto: { isRead?: boolean }): Promise<Notification>;
}

export class UpdateNotificationUseCaseImpl
  implements UpdateNotificationUseCase
{
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(id: string, dto: { isRead?: boolean }): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }

    if (dto.isRead !== undefined) {
      notification.isRead = dto.isRead;
    }

    notification.updatedAt = new Date();
    await this.notificationRepository.update(notification);
    return notification;
  }
}
