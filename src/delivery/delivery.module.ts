import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DeliveryController } from './presentation/delivery.controller';
import { CreateDeliveryUseCaseImpl } from './application/create-delivery.usecase';
import { GetDeliveryUseCaseImpl } from './application/get-delivery.usecase';
import { UpdateDeliveryUseCaseImpl } from './application/update-delivery.usecase';
import { DeliveryTypeOrmRepository } from './infrastructure/delivery-typeorm.repository';
import { DeliveryTypeOrmEntity } from './infrastructure/delivery-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_delivery',
      entities: [DeliveryTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [DeliveryController],
  providers: [
    {
      provide: 'CreateDeliveryUseCase',
      useClass: CreateDeliveryUseCaseImpl,
    },
    {
      provide: 'GetDeliveryUseCase',
      useClass: GetDeliveryUseCaseImpl,
    },
    {
      provide: 'UpdateDeliveryUseCase',
      useClass: UpdateDeliveryUseCaseImpl,
    },
    {
      provide: 'DeliveryRepository',
      useClass: DeliveryTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class DeliveryModule {}
