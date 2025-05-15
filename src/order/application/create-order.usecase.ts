import { Order } from '../domain/order.entity';
import { OrderRepository } from '../domain/order-repository.interface';

export interface CreateOrderUseCase {
  execute(dto: {
    userId: string;
    shopId: string;
    items: { menuItemId: string; quantity: number; unitPrice: number }[];
  }): Promise<Order>;
}

export class CreateOrderUseCaseImpl implements CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(dto: {
    userId: string;
    shopId: string;
    items: { menuItemId: string; quantity: number; unitPrice: number }[];
  }): Promise<Order> {
    // Validate items
    if (!dto.items.length) {
      throw new Error('Order must contain at least one item');
    }

    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const order = new Order(
      require('uuid').v4(),
      dto.userId,
      dto.shopId,
      dto.items,
      totalAmount,
      'PLACED',
      new Date(),
      new Date(),
    );

    await this.orderRepository.save(order);
    return order;
  }
}