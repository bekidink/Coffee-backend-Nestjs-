// src/application/use-cases/delivery/track-delivery.use-case.ts
import { Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '../../../domain/repositories/delivery.repository';
import { ShippoService } from '../../../infrastructure/shippo/shippo.service';

@Injectable()
export class TrackDeliveryUseCase {
  constructor(
    private deliveryRepository: IDeliveryRepository,
    private shippoService: ShippoService,
  ) {}

  async execute(
    deliveryId: string,
  ): Promise<{ delivery: Delivery; trackingDetails?: any }> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      throw new Error('Delivery not found');
    }

    let trackingDetails: any = null;
    if (delivery.trackingNumber) {
      try {
        trackingDetails = await this.shippoService.trackShipment(
          delivery.trackingNumber,
        );
      } catch (error) {
        console.warn('Failed to fetch tracking details from Shippo');
      }
    }

    return { delivery, trackingDetails };
  }
}
