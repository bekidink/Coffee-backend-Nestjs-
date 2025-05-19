// src/presentation/controllers/payment.controller.ts
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { InitiatePaymentUseCase } from '../../application/use-cases/payment/initiate-payment.use-case';
import { ConfirmPaymentUseCase } from '../../application/use-cases/payment/confirm-payment.use-case';
import { RefundPaymentUseCase } from '../../application/use-cases/payment/refund-payment.use-case';
import { ListPaymentsUseCase } from '../../application/use-cases/payment/list-payments.use-case';
import {
  InitiatePaymentDto,
  ConfirmPaymentDto,
  RefundPaymentDto,
} from '../../application/dtos/payment.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('payments')
export class PaymentController {
  constructor(
    private initiatePaymentUseCase: InitiatePaymentUseCase,
    private confirmPaymentUseCase: ConfirmPaymentUseCase,
    private refundPaymentUseCase: RefundPaymentUseCase,
    private listPaymentsUseCase: ListPaymentsUseCase,
  ) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async initiate(@Body() dto: InitiatePaymentDto) {
    return this.initiatePaymentUseCase.execute(dto);
  }

  @Post('confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async confirm(@Body() dto: ConfirmPaymentDto) {
    return this.confirmPaymentUseCase.execute(dto);
  }

  @Post('refund')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async refund(@Body() dto: RefundPaymentDto) {
    return this.refundPaymentUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  async list(
    @Query('customerId') customerId?: string,
    @Query('orderId') orderId?: string,
  ) {
    return this.listPaymentsUseCase.execute({ customerId, orderId });
  }
}
