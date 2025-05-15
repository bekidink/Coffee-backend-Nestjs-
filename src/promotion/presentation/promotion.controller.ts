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
import { CreatePromotionUseCase } from '../application/create-promotion.usecase';
import { GetPromotionUseCase } from '../application/get-promotion.usecase';
import { UpdatePromotionUseCase } from '../application/update-promotion.usecase';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('promotions')
export class PromotionController {
  constructor(
    private readonly createPromotionUseCase: CreatePromotionUseCase,
    private readonly getPromotionUseCase: GetPromotionUseCase,
    private readonly updatePromotionUseCase: UpdatePromotionUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreatePromotionDto) {
    const promotion = await this.createPromotionUseCase.execute(dto);
    return {
      id: promotion.id,
      shopId: promotion.shopId,
      title: promotion.title,
      discountType: promotion.discountType,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const promotion = await this.getPromotionUseCase.execute(id);
    return {
      id: promotion.id,
      shopId: promotion.shopId,
      menuItemId: promotion.menuItemId,
      title: promotion.title,
      description: promotion.description,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      validFrom: promotion.validFrom,
      validUntil: promotion.validUntil,
      isActive: promotion.isActive,
      createdAt: promotion.createdAt,
      updatedAt: promotion.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    const promotion = await this.updatePromotionUseCase.execute(id, dto);
    return {
      id: promotion.id,
      shopId: promotion.shopId,
      title: promotion.title,
      discountType: promotion.discountType,
    };
  }
}
