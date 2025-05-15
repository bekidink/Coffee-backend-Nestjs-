import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../domain/delivery.entity';
import { DeliveryRepository } from '../domain/delivery-repository.interface';
import { DeliveryTypeOrmEntity } from './delivery-typeorm.entity';

@Injectable()
export class DeliveryTypeOrmRepository implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryTypeOrmEntity)
    private readonly repository: Repository<DeliveryTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Delivery | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Delivery(
      entity.id,
      entity.orderId,
      entity.shopId,
      entity.customerId,
      entity.deliveryAgentId,
      entity.status,
      entity.deliveryAddress,
      entity.estimatedDeliveryTime,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByOrderId(orderId: string): Promise<Delivery | null> {
    const entity = await this.repository.findOne({ where: { orderId } });
    if (!entity) return null;
    return new Delivery(
      entity.id,
      entity.orderId,
      entity.shopId,
      entity.customerId,
      entity.deliveryAgentId,
      entity.status,
      entity.deliveryAddress,
      entity.estimatedDeliveryTime,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Delivery[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Delivery(
          entity.id,
          entity.orderId,
          entity.shopId,
          entity.customerId,
          entity.deliveryAgentId,
          entity.status,
          entity.deliveryAddress,
          entity.estimatedDeliveryTime,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async save(delivery: Delivery): Promise<void> {
    await this.repository.save({
      id: delivery.id,
      orderId: delivery.orderId,
      shopId: delivery.shopId,
      customerId: delivery.customerId,
      deliveryAgentId: delivery.deliveryAgentId,
      status: delivery.status,
      deliveryAddress: delivery.deliveryAddress,
      estimatedDeliveryTime: delivery.estimatedDeliveryTime,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    });
  }

  async update(delivery: Delivery): Promise<void> {
    await this.repository.update(delivery.id, {
      status: delivery.status,
      deliveryAgentId: delivery.deliveryAgentId!,
      estimatedDeliveryTime: delivery.estimatedDeliveryTime!,
      updatedAt: delivery.updatedAt,
    });
  }
}
