// src/application/use-cases/promotion/create-promotion.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from '../../../domain/repositories/promotion.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { SendNotificationUseCase } from '../../use-cases/notification/send-notification.use-case';
import { Promotion } from '../../../domain/entities/promotion.entity';
import { CreatePromotionDto } from '../../dtos/promotion.dto';
import { ICustomerRepository } from 'src/modules/domain/repositories/customer.repository';

@Injectable()
export class CreatePromotionUseCase {
  constructor(
    private promotionRepository: IPromotionRepository,
    private shopRepository: IShopRepository,
    private customerRepository: ICustomerRepository,
    private productRepository: IProductRepository,
    private notificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    dto: CreatePromotionDto,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ): Promise<Promotion> {
    // Validate shop or product if provided
    if (dto.shopId) {
      const shop = await this.shopRepository.findById(dto.shopId);
      if (!shop) throw new Error('Shop not found');
      if (requesterRole === 'VENDOR' && shop.vendorId !== requesterId) {
        throw new Error('Vendors can only create promotions for their shops');
      }
    }
    if (dto.productId) {
      const product = await this.productRepository.findById(dto.productId);
      if (!product) throw new Error('Product not found');
      if (requesterRole === 'VENDOR' && product.vendorId !== requesterId) {
        throw new Error(
          'Vendors can only create promotions for their products',
        );
      }
    }

    // Check for duplicate code
    const existingPromotion = await this.promotionRepository.findByCode(
      dto.code.toUpperCase(),
    );
    if (existingPromotion) throw new Error('Promotion code already exists');

    const promotion = Promotion.create({
      code: dto.code,
      type: dto.type,
      value: dto.value,
      description: dto.description,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      minOrderAmount: dto.minOrderAmount,
      maxUses: dto.maxUses,
      shopId: dto.shopId,
      productId: dto.productId,
    });

    const savedPromotion = await this.promotionRepository.save(promotion);

    // Notify customers (simplified to all customers; refine based on targeting rules)
    if (!dto.shopId && !dto.productId) {
      const customers = await this.customerRepository.findAll();
      for (const customer of customers) {
        await this.notificationUseCase.execute({
          userId: customer.id,
          userType: 'CUSTOMER',
          type: 'BROADCAST',
          message: `New promotion available! Use code ${dto.code} for ${dto.description}`,
        });
      }
    }

    return savedPromotion;
  }
}
