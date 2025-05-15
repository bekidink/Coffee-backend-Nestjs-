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
import { CreateShopUseCase } from '../application/create-shop.usecase';
import { GetShopUseCase } from '../application/get-shop.usecase';
import { UpdateShopUseCase } from '../application/update-shop.usecase';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shops')
export class ShopController {
  constructor(
    private readonly createShopUseCase: CreateShopUseCase,
    private readonly getShopUseCase: GetShopUseCase,
    private readonly updateShopUseCase: UpdateShopUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateShopDto) {
    const shop = await this.createShopUseCase.execute(dto);
    return { id: shop.id, name: shop.name, vendorId: shop.vendorId };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const shop = await this.getShopUseCase.execute(id);
    return {
      id: shop.id,
      vendorId: shop.vendorId,
      name: shop.name,
      description: shop.description,
      logoUrl: shop.logoUrl,
      contactPhone: shop.contactPhone,
      contactEmail: shop.contactEmail,
      location: shop.location,
      operatingHours: shop.operatingHours,
      isActive: shop.isActive,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateShopDto) {
    const shop = await this.updateShopUseCase.execute(id, dto);
    return { id: shop.id, name: shop.name, vendorId: shop.vendorId };
  }
}
