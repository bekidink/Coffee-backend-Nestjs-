// src/application/dtos/order.dto.ts
export class CreateOrderDto {
  customerId: string;
  shopId: string;
  items: { productId: string; quantity: number }[];
}

export class UpdateOrderStatusDto {
  orderId: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export class CancelOrderDto {
  orderId: string;
}
