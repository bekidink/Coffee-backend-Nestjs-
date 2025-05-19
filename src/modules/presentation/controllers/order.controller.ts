// src/presentation/controllers/order.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/order/update-order-status.use-case';
import { CancelOrderUseCase } from '../../application/use-cases/order/cancel-order.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/order/list-orders.use-case';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  CancelOrderDto,
} from '../../application/dtos/order.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('orders')
export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private cancelOrderUseCase: CancelOrderUseCase,
    private listOrdersUseCase: ListOrdersUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async create(@Body() dto: CreateOrderDto) {
    return this.createOrderUseCase.execute(dto);
  }

  @Patch('status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async updateStatus(@Body() dto: UpdateOrderStatusDto) {
    return this.updateOrderStatusUseCase.execute(dto);
  }

  @Patch('cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async cancel(@Body() dto: CancelOrderDto) {
    return this.cancelOrderUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async list(
    @Query('customerId') customerId?: string,
    @Query('shopId') shopId?: string,
  ) {
    return this.listOrdersUseCase.execute({ customerId, shopId });
  }
}
