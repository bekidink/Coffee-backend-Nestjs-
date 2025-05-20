// src/infrastructure/repositories/prisma-review.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IReviewRepository } from '../../domain/repositories/review.repository';
import { Review } from '../../domain/entities/review.entity';

@Injectable()
export class PrismaReviewRepository implements IReviewRepository {
  constructor(private prisma: PrismaService) {}

  async save(review: Review): Promise<Review> {
    const data = await this.prisma.review.create({
      data: {
        id: review.id,
        customerId: review.customerId,
        productId: review.productId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      },
    });
    return Review.create({
      customerId:data.customerId,
      productId:data.productId!,
      rating:data.rating,
      comment:data.comment!

    });
  }

  async findById(id: string): Promise<Review | null> {
    const data = await this.prisma.review.findUnique({ where: { id } });
    return data
      ? Review.create({
          customerId: data.customerId,
          productId: data.productId!,
          rating: data.rating,
          comment: data.comment!,
        })
      : null;
  }

  async findByCustomerId(customerId: string): Promise<Review[]> {
    const data = await this.prisma.review.findMany({ where: { customerId } });
    return data.map((item) =>
      Review.create({
        customerId: item.customerId,
        productId: item.productId!,
        rating: item.rating,
        comment: item.comment!,
      }),
    );
  }

  async findByProductId(productId: string): Promise<Review[]> {
    const data = await this.prisma.review.findMany({ where: { productId } });
    return data.map((item) =>
      Review.create({
        customerId: item.customerId,
        productId: item.productId!,
        rating: item.rating,
        comment: item.comment!,
      }),
    );
  }

  async findAll(): Promise<Review[]> {
    const data = await this.prisma.review.findMany();
    return data.map((item) =>
      Review.create({
        customerId: item.customerId,
        productId: item.productId!,
        rating: item.rating,
        comment: item.comment!,
      }),
    );
  }

  async update(review: Review): Promise<Review> {
    const data = await this.prisma.review.update({
      where: { id: review.id },
      data: {
        rating: review.rating,
        comment: review.comment,
        updatedAt: review.updatedAt,
      },
    });
    return Review.create({
      customerId: data.customerId,
      productId: data.productId!,
      rating: data.rating,
      comment: data.comment!,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.review.delete({ where: { id } });
  }

  async getAverageRating(productId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return result._avg.rating || 0;
  }
}
