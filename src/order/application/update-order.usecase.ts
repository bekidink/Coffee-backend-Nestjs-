import { Order } from '../domain/order.entity';
import { OrderRepository } from '../domain/order-repository.interface';

export interface UpdateOrderUseCase {
  execute(
    id: string,
    dto: {
      status?: 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
    },
  ): Promise<Order>;
}

export class UpdateOrderUseCaseImpl implements UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    dto: {
      status?: 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
    },
  ): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    if (dto.status) {
      order.status = dto.status;
    }

    order.updatedAt = new Date();
    await this.orderRepository.update(order);
    return order;
  }
}
