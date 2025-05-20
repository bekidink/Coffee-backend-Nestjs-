// src/domain/repositories/notification.repository.ts
import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  save(notification: Notification): Promise<Notification>;
  findById(id: string): Promise<Notification | null>;
  findByUserId(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<Notification[]>;
  findUnreadByUserId(
    userId: string,
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
  ): Promise<Notification[]>;
  update(notification: Notification): Promise<Notification>;
}
