// src/presentation/controllers/inventory.controller.ts
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { CreateOrUpdateInventoryUseCase } from '../../application/use-cases/inventory/create-or-update-inventory.use-case';
import { ReduceStockUseCase } from '../../application/use-cases/inventory/reduce-stock.use-case';
import { CheckStockUseCase } from '../../application/use-cases/inventory/check-stock.use-case';
import { ListInventoryUseCase } from '../../application/use-cases/inventory/list-inventory.use-case';
import {
  CreateOrUpdateInventoryDto,
  ReduceStockDto,
  CheckStockDto,
} from '../../application/dtos/inventory.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('inventory')
export class InventoryController {
  constructor(
    private createOrUpdateInventoryUseCase: CreateOrUpdateInventoryUseCase,
    private reduceStockUseCase: ReduceStockUseCase,
    private checkStockUseCase: CheckStockUseCase,
    private listInventoryUseCase: ListInventoryUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async createOrUpdate(@Body() dto: CreateOrUpdateInventoryDto) {
    return this.createOrUpdateInventoryUseCase.execute(dto);
  }

  @Post('reduce')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async reduceStock(@Body() dto: ReduceStockDto) {
    return this.reduceStockUseCase.execute(dto);
  }

  @Post('check')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async checkStock(@Body() dto: CheckStockDto) {
    return this.checkStockUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async list(@Query('shopId') shopId?: string) {
    return this.listInventoryUseCase.execute(shopId);
  }
}
