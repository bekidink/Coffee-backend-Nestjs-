import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrderController } from './presentation/order.controller';
import { CreateOrderUseCaseImpl } from './application/create-order.usecase';
import { GetOrderUseCaseImpl } from './application/get-order.usecase';
import { UpdateOrderUseCaseImpl } from './application/update-order.usecase';
import { OrderTypeOrmRepository } from './infrastructure/order-typeorm.repository';
import { OrderTypeOrmEntity } from './infrastructure/order-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_order',
      entities: [OrderTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'CreateOrderUseCase',
      useClass: CreateOrderUseCaseImpl,
    },
    {
      provide: 'GetOrderUseCase',
      useClass: GetOrderUseCaseImpl,
    },
    {
      provide: 'UpdateOrderUseCase',
      useClass: UpdateOrderUseCaseImpl,
    },
    {
      provide: 'OrderRepository',
      useClass: OrderTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class OrderModule {}
