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
import { CreateDeliveryUseCase } from '../application/create-delivery.usecase';
import { GetDeliveryUseCase } from '../application/get-delivery.usecase';
import { UpdateDeliveryUseCase } from '../application/update-delivery.usecase';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deliveries')
export class DeliveryController {
  constructor(
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
    private readonly getDeliveryUseCase: GetDeliveryUseCase,
    private readonly updateDeliveryUseCase: UpdateDeliveryUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateDeliveryDto) {
    const delivery = await this.createDeliveryUseCase.execute(dto);
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      status: delivery.status,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const delivery = await this.getDeliveryUseCase.execute(id);
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      shopId: delivery.shopId,
      customerId: delivery.customerId,
      deliveryAgentId: delivery.deliveryAgentId,
      status: delivery.status,
      deliveryAddress: delivery.deliveryAddress,
      estimatedDeliveryTime: delivery.estimatedDeliveryTime,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateDeliveryDto) {
    const delivery = await this.updateDeliveryUseCase.execute(id, dto);
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      status: delivery.status,
    };
  }
}
