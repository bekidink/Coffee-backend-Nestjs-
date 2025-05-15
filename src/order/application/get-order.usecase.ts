import { Order } from '../domain/order.entity';
import { OrderRepository } from '../domain/order-repository.interface';

export interface GetOrderUseCase {
  execute(id: string): Promise<Order>;
}

export class GetOrderUseCaseImpl implements GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
