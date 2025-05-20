// src/application/use-cases/promotion/apply-promotion.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from '../../../domain/repositories/promotion.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { SendNotificationUseCase } from '../../use-cases/notification/send-notification.use-case';
import { PromotionUsage } from '../../../domain/entities/promotion-usage.entity';
import { ApplyPromotionDto } from '../../dtos/promotion.dto';

@Injectable()
export class ApplyPromotionUseCase {
  constructor(
    private promotionRepository: IPromotionRepository,
    private orderRepository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private notificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    dto: ApplyPromotionDto,
  ): Promise<{ discountAmount: number; promotionId: string }> {
    const promotion = await this.promotionRepository.findByCode(
      dto.code.toUpperCase(),
    );
    if (!promotion || !promotion.isActive) {
      throw new Error('Invalid or inactive promotion code');
    }

    const now = new Date();
    if (now < promotion.startDate || now > promotion.endDate) {
      throw new Error('Promotion is not active');
    }

    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) throw new Error('Order not found');

    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer || customer.id !== order.customerId) {
      throw new Error('Invalid customer');
    }

    // Validate promotion eligibility
    if (promotion.shopId && promotion.shopId !== order.shopId) {
      throw new Error('Promotion not applicable to this shop');
    }
    if (promotion.productId) {
      const hasProduct = order.orderItems.some(
        (item) => item.productId === promotion.productId,
      );
      if (!hasProduct)
        throw new Error('Promotion not applicable to order items');
    }
    if (
      promotion.minOrderAmount &&
      order.totalAmount < promotion.minOrderAmount
    ) {
      throw new Error(
        `Order amount must be at least ${promotion.minOrderAmount}`,
      );
    }
    if (promotion.maxUses) {
      const usageCount = await this.promotionRepository.countUsages(
        promotion.id,
      );
      if (usageCount >= promotion.maxUses) {
        throw new Error('Promotion has reached maximum usage');
      }
    }
    if (
      await this.promotionRepository.hasCustomerUsedPromotion(
        promotion.id,
        dto.customerId,
      )
    ) {
      throw new Error('Customer has already used this promotion');
    }

    // Calculate discount
    let discountAmount = 0;
    if (promotion.type === 'PERCENTAGE') {
      discountAmount = order.totalAmount * (promotion.value / 100);
    } else if (promotion.type === 'FIXED') {
      discountAmount = Math.min(promotion.value, order.totalAmount);
    } else if (promotion.type === 'BOGO') {
      const cheapestItem = order.orderItems.reduce(
        (min, item) => Math.min(min, item.unitPrice),
        Infinity,
      );
      discountAmount = cheapestItem;
    }

    // Record usage
    const usage = PromotionUsage.create({
      promotionId: promotion.id,
      customerId: dto.customerId,
      orderId: dto.orderId,
    });
    await this.promotionRepository.saveUsage(usage);

    // Update order with discount (simplified; in practice, update order entity)
    // Note: Order update logic should be in Order Management Service
    // await this.orderRepository.update({
    //   ...order,
    //   totalAmount: order.totalAmount - discountAmount,
    //   updateStatus: 'PENDING',
    // });

    // Notify customer
    await this.notificationUseCase.execute({
      userId: dto.customerId,
      userType: 'CUSTOMER',
      type: 'ORDER_UPDATE',
      message: `Promotion ${dto.code} applied to order #${dto.orderId}. You saved ${discountAmount}!`,
    });

    return { discountAmount, promotionId: promotion.id };
  }
}
