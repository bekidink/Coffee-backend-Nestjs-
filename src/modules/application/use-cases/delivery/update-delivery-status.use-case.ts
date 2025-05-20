// src/application/use-cases/delivery/update-delivery-status.use-case.ts
import { Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '../../../domain/repositories/delivery.repository';
import { SendNotificationUseCase } from '../../use-cases/notification/send-notification.use-case';
import { UpdateDeliveryStatusDto } from '../../dtos/delivery.dto';

@Injectable()
export class UpdateDeliveryStatusUseCase {
  constructor(
    private deliveryRepository: IDeliveryRepository,
    private notificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    deliveryId: string,
    dto: UpdateDeliveryStatusDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      throw new Error('Delivery not found');
    }

    delivery.updateStatus(dto.status, dto.trackingNumber);
    const updatedDelivery = await this.deliveryRepository.update(delivery);

    // Notify customer
    await this.notificationUseCase.execute({
      userId: delivery.customerId,
      userType: 'CUSTOMER',
      type: 'ORDER_UPDATE',
      message: `Your order #${delivery.orderId} delivery status updated to ${dto.status}. Tracking: ${dto.trackingNumber || delivery.trackingNumber || 'N/A'}`,
    });

    return updatedDelivery;
  }
}
