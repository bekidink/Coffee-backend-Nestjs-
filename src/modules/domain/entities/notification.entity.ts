// src/domain/entities/notification.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Notification {
  private constructor(
    public readonly id: string,
    public userId: string,
    public userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
    public type:
      | 'ORDER_UPDATE'
      | 'PROMOTION'
      | 'PAYMENT_CONFIRMED'
      | 'BROADCAST',
    public message: string,
    public isRead: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    userId: string;
    userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    type: 'ORDER_UPDATE' | 'PROMOTION' | 'PAYMENT_CONFIRMED' | 'BROADCAST';
    message: string;
  }): Notification {
    return new Notification(
      data.id || uuidv4(),
      data.userId,
      data.userType,
      data.type,
      data.message,
      false,
      new Date(),
      new Date(),
    );
  }

  markAsRead(): void {
    this.isRead = true;
    this.updatedAt = new Date();
  }
}
