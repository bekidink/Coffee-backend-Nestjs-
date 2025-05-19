// src/application/use-cases/order/create-order.use-case.ts
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { Order } from '../../../domain/entities/order.entity';
import { OrderItem } from '../../../domain/entities/order-item.entity';
import { CreateOrderDto } from '../../dtos/order.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private shopRepository: IShopRepository,
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const shop = await this.shopRepository.findById(dto.shopId);
    if (!shop || shop.status !== 'ACTIVE') {
      throw new Error('Valid shop required');
    }

    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of dto.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product || product.vendorId !== shop.vendorId) {
        throw new Error(`Product ${item.productId} not valid for this shop`);
      }

      const orderItem = OrderItem.create({
        orderId: '', // Will be set after order creation
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      });

      orderItems.push(orderItem);
      totalAmount += product.price * item.quantity;
    }

    const order = Order.create({
      customerId: dto.customerId,
      shopId: dto.shopId,
      totalAmount,
      orderItems,
    });

    const savedOrder = await this.orderRepository.save(order);
    // Update orderItems with saved order ID
    savedOrder.orderItems.forEach((item) => (item.orderId = savedOrder.id));
    return savedOrder;
  }
}
