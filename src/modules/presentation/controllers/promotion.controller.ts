// src/interfaces/http/promotion.controller.ts
import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PromotionService } from '../../application/services/promotion.service';
import { CreatePromotionDto, UpdatePromotionDto } from '../../application/dtos/promotion.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard'; // Assumed to exist

@Controller('promotions')
@UseGuards(JwtAuthGuard) // Restrict to authenticated vendors/admins
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @Post()
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    const promotion =
      await this.promotionService.createPromotion(createPromotionDto);
    return { promotion };
  }

  @Patch(':id')
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    const promotion = await this.promotionService.updatePromotion(
      id,
      updatePromotionDto,
    );
    return { promotion };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const promotion = await this.promotionService.findById(id);
    return { promotion };
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string) {
    const promotion = await this.promotionService.findByCode(code);
    return { promotion };
  }

  @Get('shop/:shopId')
  async findByShopId(@Param('shopId') shopId: string) {
    const promotions = await this.promotionService.findByShopId(shopId);
    return { promotions };
  }

  @Get()
  async findAll() {
    const promotions = await this.promotionService.findAll();
    return { promotions };
  }

  @Delete(':id')
  async deletePromotion(@Param('id') id: string) {
    await this.promotionService.deletePromotion(id);
    return { message: 'Promotion deleted successfully' };
  }
}
