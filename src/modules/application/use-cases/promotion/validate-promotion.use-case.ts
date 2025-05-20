// src/application/use-cases/promotion/validate-promotion.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from '../../../domain/repositories/promotion.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';

@Injectable()
export class ValidatePromotionUseCase {
  constructor(
    private promotionRepository: IPromotionRepository,
    private orderRepository: IOrderRepository,
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(
    code: string,
    orderId: string,
    customerId: string,
  ): Promise<{ isValid: boolean; message?: string }> {
    const promotion = await this.promotionRepository.findByCode(
      code.toUpperCase(),
    );
    if (!promotion || !promotion.isActive) {
      return { isValid: false, message: 'Invalid or inactive promotion code' };
    }

    const now = new Date();
    if (now < promotion.startDate || now > promotion.endDate) {
      return { isValid: false, message: 'Promotion is not active' };
    }

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return { isValid: false, message: 'Order not found' };
    }

    const customer = await this.customerRepository.findById(customerId);
    if (!customer || customer.id !== order.customerId) {
      return { isValid: false, message: 'Invalid customer' };
    }

    if (promotion.shopId && promotion.shopId !== order.shopId) {
      return {
        isValid: false,
        message: 'Promotion not applicable to this shop',
      };
    }
    if (promotion.productId) {
      const hasProduct = order.orderItems.some(
        (item) => item.productId === promotion.productId,
      );
      if (!hasProduct) {
        return {
          isValid: false,
          message: 'Promotion not applicable to order items',
        };
      }
    }
    if (
      promotion.minOrderAmount &&
      order.totalAmount < promotion.minOrderAmount
    ) {
      return {
        isValid: false,
        message: `Order amount must be at least ${promotion.minOrderAmount}`,
      };
    }
    if (promotion.maxUses) {
      const usageCount = await this.promotionRepository.countUsages(
        promotion.id,
      );
      if (usageCount >= promotion.maxUses) {
        return {
          isValid: false,
          message: 'Promotion has reached maximum usage',
        };
      }
    }
    if (
      await this.promotionRepository.hasCustomerUsedPromotion(
        promotion.id,
        customerId,
      )
    ) {
      return {
        isValid: false,
        message: 'Customer has already used this promotion',
      };
    }

    return { isValid: true };
  }
}
