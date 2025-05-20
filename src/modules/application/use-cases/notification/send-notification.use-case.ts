// src/application/use-cases/notification/send-notification.use-case.ts
import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/repositories/notification.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { Notification } from '../../../domain/entities/notification.entity';
import { SendNotificationDto } from '../../dtos/notification.dto';
import { NotificationService } from '../../../infrastructure/notification/notification.service';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private notificationRepository: INotificationRepository,
    private customerRepository: ICustomerRepository,
    private vendorRepository: IVendorRepository,
    private notificationService: NotificationService,
  ) {}

  async execute(dto: SendNotificationDto): Promise<Notification> {
    // Validate user
    if (dto.userType === 'CUSTOMER') {
      const customer = await this.customerRepository.findById(dto.userId);
      if (!customer) throw new Error('Customer not found');
    } else if (dto.userType === 'VENDOR') {
      const vendor = await this.vendorRepository.findById(dto.userId);
      if (!vendor) throw new Error('Vendor not found');
    } else if (dto.userType === 'ADMIN') {
      // Admin validation can be added if needed
    } else {
      throw new Error('Invalid user type');
    }

    const notification = Notification.create(dto);
    const savedNotification =
      await this.notificationRepository.save(notification);

    // Send notification via external service (email/push)
    await this.notificationService.send({
      userId: dto.userId,
      userType: dto.userType,
      message: dto.message,
      type: dto.type,
    });

    return savedNotification;
  }
}
