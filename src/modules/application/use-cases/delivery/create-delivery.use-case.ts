// src/application/use-cases/delivery/create-delivery.use-case.ts
import { Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '../../../domain/repositories/delivery.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { SendNotificationUseCase } from '../../use-cases/notification/send-notification.use-case';
import { Delivery } from '../../../domain/entities/delivery.entity';
import { CreateDeliveryDto } from '../../dtos/delivery.dto';
import { ShippoService } from '../../../infrastructure/shippo/shippo.service';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    private deliveryRepository: IDeliveryRepository,
    private orderRepository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private shopRepository: IShopRepository,
    private notificationUseCase: SendNotificationUseCase,
    private shippoService: ShippoService,
  ) {}

  async execute(dto: CreateDeliveryDto): Promise<Delivery> {
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order || order.status !== 'CONFIRMED') {
      throw new Error('Valid confirmed order required');
    }

    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer || customer.id !== order.customerId) {
      throw new Error('Valid customer required');
    }

    const shop = await this.shopRepository.findById(dto.shopId);
    if (!shop || shop.id !== order.shopId) {
      throw new Error('Valid shop required');
    }

    const existingDelivery = await this.deliveryRepository.findByOrderId(
      dto.orderId,
    );
    if (existingDelivery) {
      throw new Error('Delivery already exists for this order');
    }

    // Create shipment via Shippo (if external delivery)
    let trackingNumber: string | null = null;
    try {
      trackingNumber = await this.shippoService.createShipment({
        orderId: dto.orderId,
        customerAddress: customer.address || 'Unknown',
        shopAddress: shop.addresses,
      });
    } catch (error) {
      console.warn(
        'Shippo integration failed, proceeding with in-house delivery',
      );
    }

    const delivery = Delivery.create({
      orderId: dto.orderId,
      customerId: dto.customerId,
      shopId: dto.shopId,
      trackingNumber:trackingNumber??"",
      estimatedDeliveryDate: 
         new Date(dto.estimatedDeliveryDate!)
        
    });
    const savedDelivery = await this.deliveryRepository.save(delivery);

    // Notify customer
    await this.notificationUseCase.execute({
      userId: dto.customerId,
      userType: 'CUSTOMER',
      type: 'ORDER_UPDATE',
      message: `Your order #${dto.orderId} has been assigned for delivery. Tracking: ${trackingNumber || 'N/A'}`,
    });

    return savedDelivery;
  }
}
