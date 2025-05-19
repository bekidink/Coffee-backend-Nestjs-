// src/presentation/modules/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from '../controllers/payment.controller';
import { InitiatePaymentUseCase } from '../../application/use-cases/payment/initiate-payment.use-case';
import { ConfirmPaymentUseCase } from '../../application/use-cases/payment/confirm-payment.use-case';
import { RefundPaymentUseCase } from '../../application/use-cases/payment/refund-payment.use-case';
import { ListPaymentsUseCase } from '../../application/use-cases/payment/list-payments.use-case';
import { PrismaPaymentRepository } from '../../infrastructure/repositories/prisma-payment.repository';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { StripeService } from '../../infrastructure/stripe/stripe.service';
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
  controllers: [PaymentController],
  providers: [
    InitiatePaymentUseCase,
    ConfirmPaymentUseCase,
    RefundPaymentUseCase,
    ListPaymentsUseCase,
    StripeService,
    PrismaService,
    {
      provide: 'IPaymentRepository',
      useClass: PrismaPaymentRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
  ],
})
export class PaymentModule {}
