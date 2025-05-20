// src/application/dtos/notification.dto.ts
export class SendNotificationDto {
  userId: string;
  userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  type: 'ORDER_UPDATE' | 'REVIEW_SUBMITTED' | 'PAYMENT_CONFIRMED' | 'BROADCAST';
  message: string;
}

export class SendBroadcastNotificationDto {
  message: string;
  userType: 'CUSTOMER' | 'VENDOR';
}
