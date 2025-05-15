import { Delivery } from '../domain/delivery.entity';
import { DeliveryRepository } from '../domain/delivery-repository.interface';

export interface CreateDeliveryUseCase {
  execute(dto: {
    orderId: string;
    shopId: string;
    customerId: string;
    deliveryAddress: string;
    estimatedDeliveryTime?: Date;
  }): Promise<Delivery>;
}

export class CreateDeliveryUseCaseImpl implements CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(dto: {
    orderId: string;
    shopId: string;
    customerId: string;
    deliveryAddress: string;
    estimatedDeliveryTime?: Date;
  }): Promise<Delivery> {
    const existingDelivery = await this.deliveryRepository.findByOrderId(
      dto.orderId,
    );
    if (existingDelivery) {
      throw new Error('Delivery already exists for this order');
    }

    const delivery = new Delivery(
      require('uuid').v4(),
      dto.orderId,
      dto.shopId,
      dto.customerId,
      null,
      'PENDING',
      dto.deliveryAddress,
      dto.estimatedDeliveryTime || null,
      new Date(),
      new Date(),
    );

    await this.deliveryRepository.save(delivery);
    return delivery;
  }
}
