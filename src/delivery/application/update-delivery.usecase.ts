import { Delivery } from '../domain/delivery.entity';
import { DeliveryRepository } from '../domain/delivery-repository.interface';

export interface UpdateDeliveryUseCase {
  execute(
    id: string,
    dto: {
      status?:
        | 'PENDING'
        | 'ASSIGNED'
        | 'PICKED_UP'
        | 'IN_TRANSIT'
        | 'DELIVERED'
        | 'CANCELLED';
      deliveryAgentId?: string;
      estimatedDeliveryTime?: Date;
    },
  ): Promise<Delivery>;
}

export class UpdateDeliveryUseCaseImpl implements UpdateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(
    id: string,
    dto: {
      status?:
        | 'PENDING'
        | 'ASSIGNED'
        | 'PICKED_UP'
        | 'IN_TRANSIT'
        | 'DELIVERED'
        | 'CANCELLED';
      deliveryAgentId?: string;
      estimatedDeliveryTime?: Date;
    },
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findById(id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }

    if (dto.status) {
      if (delivery.status === 'DELIVERED' || delivery.status === 'CANCELLED') {
        throw new Error(
          'Cannot update status of completed or cancelled delivery',
        );
      }
      if (dto.status === 'ASSIGNED' && !dto.deliveryAgentId) {
        throw new Error('Delivery agent ID is required for ASSIGNED status');
      }
      delivery.status = dto.status;
    }

    delivery.deliveryAgentId =
      dto.deliveryAgentId !== undefined
        ? dto.deliveryAgentId
        : delivery.deliveryAgentId;
    delivery.estimatedDeliveryTime =
      dto.estimatedDeliveryTime !== undefined
        ? dto.estimatedDeliveryTime
        : delivery.estimatedDeliveryTime;
    delivery.updatedAt = new Date();

    await this.deliveryRepository.update(delivery);
    return delivery;
  }
}
