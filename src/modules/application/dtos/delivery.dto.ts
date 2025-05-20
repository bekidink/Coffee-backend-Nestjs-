// src/application/dtos/delivery.dto.ts
export class CreateDeliveryDto {
  orderId: string;
  customerId: string;
  shopId: string;
  estimatedDeliveryDate?: string; // ISO date string
}

export class UpdateDeliveryStatusDto {
  status: 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  trackingNumber?: string;
}
