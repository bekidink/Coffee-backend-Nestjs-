import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ReviewController } from './presentation/review.controller';
import { CreateReviewUseCaseImpl } from './application/create-review.usecase';
import { GetReviewUseCaseImpl } from './application/get-review.usecase';
import { UpdateReviewUseCaseImpl } from './application/update-review.usecase';
import { ReviewTypeOrmRepository } from './infrastructure/review-typeorm.repository';
import { ReviewTypeOrmEntity } from './infrastructure/review-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_review',
      entities: [ReviewTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ReviewController],
  providers: [
    {
      provide: 'CreateReviewUseCase',
      useClass: CreateReviewUseCaseImpl,
    },
    {
      provide: 'GetReviewUseCase',
      useClass: GetReviewUseCaseImpl,
    },
    {
      provide: 'UpdateReviewUseCase',
      useClass: UpdateReviewUseCaseImpl,
    },
    {
      provide: 'ReviewRepository',
      useClass: ReviewTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class ReviewModule {}
