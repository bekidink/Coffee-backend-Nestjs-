import { Delivery } from '../domain/delivery.entity';
import { DeliveryRepository } from '../domain/delivery-repository.interface';

export interface GetDeliveryUseCase {
  execute(id: string): Promise<Delivery>;
}

export class GetDeliveryUseCaseImpl implements GetDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(id: string): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findById(id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }
    return delivery;
  }
}
