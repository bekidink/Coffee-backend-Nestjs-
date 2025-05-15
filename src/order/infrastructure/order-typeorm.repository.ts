import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../domain/order.entity';
import { OrderRepository } from '../domain/order-repository.interface';
import { OrderTypeOrmEntity } from './order-typeorm.entity';

@Injectable()
export class OrderTypeOrmRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderTypeOrmEntity)
    private readonly repository: Repository<OrderTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Order(
      entity.id,
      entity.userId,
      entity.shopId,
      entity.items,
      entity.totalAmount,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map(
      (entity) =>
        new Order(
          entity.id,
          entity.userId,
          entity.shopId,
          entity.items,
          entity.totalAmount,
          entity.status,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByShopId(shopId: string): Promise<Order[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Order(
          entity.id,
          entity.userId,
          entity.shopId,
          entity.items,
          entity.totalAmount,
          entity.status,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async save(order: Order): Promise<void> {
    await this.repository.save({
      id: order.id,
      userId: order.userId,
      shopId: order.shopId,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }

  async update(order: Order): Promise<void> {
    await this.repository.update(order.id, {
      status: order.status,
      updatedAt: order.updatedAt,
    });
  }
}
