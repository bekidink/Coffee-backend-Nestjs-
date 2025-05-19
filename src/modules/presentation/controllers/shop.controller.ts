// src/presentation/controllers/shop.controller.ts
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
import { CreateShopUseCase } from '../../application/use-cases/shop/create-shop.use-case';
import { UpdateShopUseCase } from '../../application/use-cases/shop/update-shop.use-case';
import { ListShopsUseCase } from '../../application/use-cases/shop/list-shops.use-case';
import { ChangeShopStatusUseCase } from '../../application/use-cases/shop/change-shop-status.use-case';
import {
  CreateShopDto,
  UpdateShopDto,
  ChangeShopStatusDto,
} from '../../application/dtos/shop.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('shops')
export class ShopController {
  constructor(
    private createShopUseCase: CreateShopUseCase,
    private updateShopUseCase: UpdateShopUseCase,
    private listShopsUseCase: ListShopsUseCase,
    private changeShopStatusUseCase: ChangeShopStatusUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async create(@Body() dto: CreateShopDto) {
    return this.createShopUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async update(@Param('id') id: string, @Body() dto: UpdateShopDto) {
    return this.updateShopUseCase.execute(id, dto);
  }

  @Get()
  async list(@Query('vendorId') vendorId?: string) {
    return this.listShopsUseCase.execute(vendorId);
  }

  @Patch('status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async changeStatus(@Body() dto: ChangeShopStatusDto) {
    return this.changeShopStatusUseCase.execute(dto);
  }
}
