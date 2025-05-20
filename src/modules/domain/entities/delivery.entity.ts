// src/domain/entities/delivery.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Delivery {
  private constructor(
    public readonly id: string,
    public orderId: string,
    public customerId: string,
    public shopId: string,
    public status: 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED',
    public trackingNumber: string | null,
    public estimatedDeliveryDate: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    orderId: string;
    customerId: string;
    shopId: string;
    status?: 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
    trackingNumber?: string;
    estimatedDeliveryDate?: Date;
  }): Delivery {
    return new Delivery(
      data.id || uuidv4(),
      data.orderId,
      data.customerId,
      data.shopId,
      data.status || 'ASSIGNED',
      data.trackingNumber || null,
      data.estimatedDeliveryDate || null,
      new Date(),
      new Date(),
    );
  }

  updateStatus(
    status: 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED',
    trackingNumber?: string,
  ): void {
    this.status = status;
    if (trackingNumber) this.trackingNumber = trackingNumber;
    this.updatedAt = new Date();
  }
}
