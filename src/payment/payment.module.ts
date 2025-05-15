import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PaymentController } from './presentation/payment.controller';
import { CreatePaymentUseCaseImpl } from './application/create-payment.usecase';
import { GetPaymentUseCaseImpl } from './application/get-payment.usecase';
import { UpdatePaymentUseCaseImpl } from './application/update-payment.usecase';
import { PaymentTypeOrmRepository } from './infrastructure/payment-typeorm.repository';
import { PaymentTypeOrmEntity } from './infrastructure/payment-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_payment',
      entities: [PaymentTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'CreatePaymentUseCase',
      useClass: CreatePaymentUseCaseImpl,
    },
    {
      provide: 'GetPaymentUseCase',
      useClass: GetPaymentUseCaseImpl,
    },
    {
      provide: 'UpdatePaymentUseCase',
      useClass: UpdatePaymentUseCaseImpl,
    },
    {
      provide: 'PaymentRepository',
      useClass: PaymentTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class PaymentModule {}
