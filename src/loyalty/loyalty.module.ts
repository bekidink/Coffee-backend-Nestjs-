import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoyaltyController } from './presentation/loyalty.controller';
import { CreateLoyaltyUseCaseImpl } from './application/create-loyalty.usecase';
import { GetLoyaltyUseCaseImpl } from './application/get-loyalty.usecase';
import { UpdateLoyaltyUseCaseImpl } from './application/update-loyalty.usecase';
import { LoyaltyTypeOrmRepository } from './infrastructure/loyalty-typeorm.repository';
import { LoyaltyTypeOrmEntity } from './infrastructure/loyalty-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoyaltyTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_loyalty',
      entities: [LoyaltyTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [LoyaltyController],
  providers: [
    {
      provide: 'CreateLoyaltyUseCase',
      useClass: CreateLoyaltyUseCaseImpl,
    },
    {
      provide: 'GetLoyaltyUseCase',
      useClass: GetLoyaltyUseCaseImpl,
    },
    {
      provide: 'UpdateLoyaltyUseCase',
      useClass: UpdateLoyaltyUseCaseImpl,
    },
    {
      provide: 'LoyaltyRepository',
      useClass: LoyaltyTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class LoyaltyModule {}
