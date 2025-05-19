// src/presentation/modules/review.module.ts
import { Module } from '@nestjs/common';
import { ReviewController } from '../controllers/review.controller';
import { CreateReviewUseCase } from '../../application/use-cases/review/create-review.use-case';
import { UpdateReviewUseCase } from '../../application/use-cases/review/update-review.use-case';
import { DeleteReviewUseCase } from '../../application/use-cases/review/delete-review.use-case';
import { ListReviewsUseCase } from '../../application/use-cases/review/list-reviews.use-case';
import { GetAverageRatingUseCase } from '../../application/use-cases/review/get-average-rating.use-case';
import { PrismaReviewRepository } from '../../infrastructure/repositories/prisma-review.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ReviewController],
  providers: [
    CreateReviewUseCase,
    UpdateReviewUseCase,
    DeleteReviewUseCase,
    ListReviewsUseCase,
    GetAverageRatingUseCase,
    PrismaService,
    {
      provide: 'IReviewRepository',
      useClass: PrismaReviewRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
})
export class ReviewModule {}
