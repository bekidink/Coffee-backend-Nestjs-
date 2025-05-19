// src/domain/entities/order.entity.ts
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './order-item.entity';

export class Order {
  private constructor(
    public readonly id: string,
    public customerId: string,
    public shopId: string,
    public totalAmount: number,
    public status:
      | 'PENDING'
      | 'CONFIRMED'
      | 'SHIPPED'
      | 'DELIVERED'
      | 'CANCELLED',
    public createdAt: Date,
    public updatedAt: Date,
    public orderItems: OrderItem[],
  ) {}

  static create(data: {
    id?: string;
    customerId: string;
    shopId: string;
    totalAmount: number;
    orderItems: OrderItem[];
    status?: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  }): Order {
    return new Order(
      data.id || uuidv4(),
      data.customerId,
      data.shopId,
      data.totalAmount,
      data.status || 'PENDING',
      new Date(),
      new Date(),
      data.orderItems,
    );
  }

  updateStatus(
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED',
  ): void {
    if (this.status === 'DELIVERED' || this.status === 'CANCELLED') {
      throw new Error('Cannot update status of delivered or cancelled order');
    }
    this.status = status;
    this.updatedAt = new Date();
  }
}
