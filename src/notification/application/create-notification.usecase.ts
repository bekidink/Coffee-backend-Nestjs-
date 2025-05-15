import { Notification } from '../domain/notification.entity';
import { NotificationRepository } from '../domain/notification-repository.interface';

export interface CreateNotificationUseCase {
  execute(dto: {
    userId: string;
    type: 'ORDER_UPDATE' | 'PROMOTION' | 'LOW_STOCK' | 'GENERAL';
    message: string;
  }): Promise<Notification>;
}

export class CreateNotificationUseCaseImpl
  implements CreateNotificationUseCase
{
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(dto: {
    userId: string;
    type: 'ORDER_UPDATE' | 'PROMOTION' | 'LOW_STOCK' | 'GENERAL';
    message: string;
  }): Promise<Notification> {
    const notification = new Notification(
      require('uuid').v4(),
      dto.userId,
      dto.type,
      dto.message,
      false,
      new Date(),
      new Date(),
    );

    await this.notificationRepository.save(notification);
    return notification;
  }
}
