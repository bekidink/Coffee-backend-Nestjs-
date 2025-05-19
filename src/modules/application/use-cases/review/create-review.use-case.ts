// src/application/use-cases/review/create-review.use-case.ts
import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '../../../domain/repositories/review.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { Review } from '../../../domain/entities/review.entity';
import { CreateReviewDto } from '../../dtos/review.dto';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private customerRepository: ICustomerRepository,
    private productRepository: IProductRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(dto: CreateReviewDto): Promise<Review> {
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Verify customer has purchased the product
    const orders = await this.orderRepository.findByCustomerId(dto.customerId);
    const hasPurchased = orders.some((order) =>
      order.orderItems.some((item) => item.productId === dto.productId),
    );
    if (!hasPurchased) {
      throw new Error('Customer must purchase the product to review it');
    }

    // Check if customer already reviewed this product
    const existingReview = await this.reviewRepository.findByProductId(
      dto.productId,
    );
    if (existingReview.some((review) => review.customerId === dto.customerId)) {
      throw new Error('Customer has already reviewed this product');
    }

    const review = Review.create(dto);
    return this.reviewRepository.save(review);
  }
}
