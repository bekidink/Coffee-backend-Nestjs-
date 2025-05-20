// src/application/use-cases/notification/send-broadcast-notification.use-case.ts
import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/repositories/notification.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { Notification } from '../../../domain/entities/notification.entity';
import { SendBroadcastNotificationDto } from '../../dtos/notification.dto';
import { NotificationService } from '../../../infrastructure/notification/notification.service';

@Injectable()
export class SendBroadcastNotificationUseCase {
  constructor(
    private notificationRepository: INotificationRepository,
    private customerRepository: ICustomerRepository,
    private vendorRepository: IVendorRepository,
    private notificationService: NotificationService,
  ) {}

  async execute(dto: SendBroadcastNotificationDto): Promise<void> {
    let users: { id: string }[] = [];
    if (dto.userType === 'CUSTOMER') {
      users = await this.customerRepository.findAll();
    } else if (dto.userType === 'VENDOR') {
      users = await this.vendorRepository.findAll();
    } else {
      throw new Error('Invalid user type for broadcast');
    }

    for (const user of users) {
      const notification = Notification.create({
        userId: user.id,
        userType: dto.userType,
        type: 'BROADCAST',
        message: dto.message,
      });
      await this.notificationRepository.save(notification);

      await this.notificationService.send({
        userId: user.id,
        userType: dto.userType,
        message: dto.message,
        type: 'BROADCAST',
      });
    }
  }
}
