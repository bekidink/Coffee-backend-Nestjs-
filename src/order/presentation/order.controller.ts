import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateOrderUseCase } from '../application/create-order.usecase';
import { GetOrderUseCase } from '../application/get-order.usecase';
import { UpdateOrderUseCase } from '../application/update-order.usecase';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.createOrderUseCase.execute(dto);
    return {
      id: order.id,
      userId: order.userId,
      shopId: order.shopId,
      totalAmount: order.totalAmount,
      status: order.status,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const order = await this.getOrderUseCase.execute(id);
    return {
      id: order.id,
      userId: order.userId,
      shopId: order.shopId,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    const order = await this.updateOrderUseCase.execute(id, dto);
    return {
      id: order.id,
      userId: order.userId,
      shopId: order.shopId,
      totalAmount: order.totalAmount,
      status: order.status,
    };
  }
}
