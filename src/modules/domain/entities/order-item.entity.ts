// src/domain/entities/order-item.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class OrderItem {
  private constructor(
    public readonly id: string,
    public orderId: string,
    public productId: string,
    public quantity: number,
    public unitPrice: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
  }): OrderItem {
    return new OrderItem(
      data.id || uuidv4(),
      data.orderId,
      data.productId,
      data.quantity,
      data.unitPrice,
      new Date(),
      new Date(),
    );
  }
}
