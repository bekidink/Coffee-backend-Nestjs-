import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RecommendationController } from './presentation/recommendation.controller';
import { GenerateRecommendationUseCaseImpl } from './application/generate-recommendation.usecase';
import { GetRecommendationUseCaseImpl } from './application/get-recommendation.usecase';
import { UpdatePreferencesUseCaseImpl } from './application/update-preferences.usecase';
import { RecommendationTypeOrmRepository } from './infrastructure/recommendation-typeorm.repository';
import { RecommendationTypeOrmEntity } from './infrastructure/recommendation-typeorm.entity';
import { PreferenceTypeOrmEntity } from './infrastructure/preference-typeorm.entity';
import { OrderTypeOrmEntity } from './infrastructure/order-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecommendationTypeOrmEntity,
      PreferenceTypeOrmEntity,
      OrderTypeOrmEntity,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_recommendation',
      entities: [
        RecommendationTypeOrmEntity,
        PreferenceTypeOrmEntity,
        OrderTypeOrmEntity,
      ],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [RecommendationController],
  providers: [
    {
      provide: 'GenerateRecommendationUseCase',
      useClass: GenerateRecommendationUseCaseImpl,
    },
    {
      provide: 'GetRecommendationUseCase',
      useClass: GetRecommendationUseCaseImpl,
    },
    {
      provide: 'UpdatePreferencesUseCase',
      useClass: UpdatePreferencesUseCaseImpl,
    },
    {
      provide: 'RecommendationRepository',
      useClass: RecommendationTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class RecommendationModule {}
