import { Notification } from '../domain/notification.entity';
import { NotificationRepository } from '../domain/notification-repository.interface';

export interface GetNotificationUseCase {
  execute(id: string): Promise<Notification>;
}

export class GetNotificationUseCaseImpl implements GetNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  }
}
