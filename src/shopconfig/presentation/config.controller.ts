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
import { CreateConfigUseCase } from '../application/create-config.usecase';
import { GetConfigUseCase } from '../application/get-config.usecase';
import { UpdateConfigUseCase } from '../application/update-config.usecase';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shopconfigs')
export class ConfigController {
  constructor(
    private readonly createConfigUseCase: CreateConfigUseCase,
    private readonly getConfigUseCase: GetConfigUseCase,
    private readonly updateConfigUseCase: UpdateConfigUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateConfigDto) {
    const config = await this.createConfigUseCase.execute(dto);
    return {
      id: config.id,
      shopId: config.shopId,
      operatingHours: config.operatingHours,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const config = await this.getConfigUseCase.execute(id);
    return {
      id: config.id,
      shopId: config.shopId,
      operatingHours: config.operatingHours,
      deliveryEnabled: config.deliveryEnabled,
      pickupEnabled: config.pickupEnabled,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateConfigDto) {
    const config = await this.updateConfigUseCase.execute(id, dto);
    return {
      id: config.id,
      shopId: config.shopId,
      operatingHours: config.operatingHours,
    };
  }
}
