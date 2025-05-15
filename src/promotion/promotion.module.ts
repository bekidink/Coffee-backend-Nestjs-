import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PromotionController } from './presentation/promotion.controller';
import { CreatePromotionUseCaseImpl } from './application/create-promotion.usecase';
import { GetPromotionUseCaseImpl } from './application/get-promotion.usecase';
import { UpdatePromotionUseCaseImpl } from './application/update-promotion.usecase';
import { PromotionTypeOrmRepository } from './infrastructure/promotion-typeorm.repository';
import { PromotionTypeOrmEntity } from './infrastructure/promotion-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_promotion',
      entities: [PromotionTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [PromotionController],
  providers: [
    {
      provide: 'CreatePromotionUseCase',
      useClass: CreatePromotionUseCaseImpl,
    },
    {
      provide: 'GetPromotionUseCase',
      useClass: GetPromotionUseCaseImpl,
    },
    {
      provide: 'UpdatePromotionUseCase',
      useClass: UpdatePromotionUseCaseImpl,
    },
    {
      provide: 'PromotionRepository',
      useClass: PromotionTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class PromotionModule {}
