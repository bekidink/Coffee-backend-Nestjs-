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
import { CreateInventoryUseCase } from '../application/create-inventory.usecase';
import { GetInventoryUseCase } from '../application/get-inventory.usecase';
import { UpdateInventoryUseCase } from '../application/update-inventory.usecase';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly createInventoryUseCase: CreateInventoryUseCase,
    private readonly getInventoryUseCase: GetInventoryUseCase,
    private readonly updateInventoryUseCase: UpdateInventoryUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateInventoryDto) {
    const inventory = await this.createInventoryUseCase.execute(dto);
    return {
      id: inventory.id,
      shopId: inventory.shopId,
      name: inventory.name,
      quantity: inventory.quantity,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const inventory = await this.getInventoryUseCase.execute(id);
    return {
      id: inventory.id,
      shopId: inventory.shopId,
      menuItemId: inventory.menuItemId,
      name: inventory.name,
      quantity: inventory.quantity,
      unit: inventory.unit,
      lowStockThreshold: inventory.lowStockThreshold,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    const inventory = await this.updateInventoryUseCase.execute(id, dto);
    return {
      id: inventory.id,
      shopId: inventory.shopId,
      name: inventory.name,
      quantity: inventory.quantity,
    };
  }
}
