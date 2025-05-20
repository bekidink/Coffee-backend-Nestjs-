// src/presentation/controllers/delivery.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateDeliveryUseCase } from '../../application/use-cases/delivery/create-delivery.use-case';
import { UpdateDeliveryStatusUseCase } from '../../application/use-cases/delivery/update-delivery-status.use-case';
import { TrackDeliveryUseCase } from '../../application/use-cases/delivery/track-delivery.use-case';
import { ListDeliveriesUseCase } from '../../application/use-cases/delivery/list-deliveries.use-case';
import {
  CreateDeliveryDto,
  UpdateDeliveryStatusDto,
} from '../../application/dtos/delivery.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('deliveries')
export class DeliveryController {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase,
    private trackDeliveryUseCase: TrackDeliveryUseCase,
    private listDeliveriesUseCase: ListDeliveriesUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async create(@Body() dto: CreateDeliveryDto) {
    return this.createDeliveryUseCase.execute(dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDeliveryStatusDto,
  ) {
    return this.updateDeliveryStatusUseCase.execute(id, dto);
  }

  @Get(':id/track')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async track(@Param('id') id: string) {
    return this.trackDeliveryUseCase.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async list(
    @Query('orderId') orderId?: string,
    @Query('customerId') customerId?: string,
    @Query('shopId') shopId?: string,
  ) {
    return this.listDeliveriesUseCase.execute({ orderId, customerId, shopId });
  }
}
