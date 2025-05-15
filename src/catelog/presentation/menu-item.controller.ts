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
import { CreateMenuItemUseCase } from '../application/create-menu-item.usecase';
import { GetMenuItemUseCase } from '../application/get-menu-item.usecase';
import { UpdateMenuItemUseCase } from '../application/update-menu-item.usecase';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('menu-items')
export class MenuItemController {
  constructor(
    private readonly createMenuItemUseCase: CreateMenuItemUseCase,
    private readonly getMenuItemUseCase: GetMenuItemUseCase,
    private readonly updateMenuItemUseCase: UpdateMenuItemUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateMenuItemDto) {
    const menuItem = await this.createMenuItemUseCase.execute(dto);
    return {
      id: menuItem.id,
      shopId: menuItem.shopId,
      name: menuItem.name,
      price: menuItem.price,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const menuItem = await this.getMenuItemUseCase.execute(id);
    return {
      id: menuItem.id,
      shopId: menuItem.shopId,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      isAvailable: menuItem.isAvailable,
      createdAt: menuItem.createdAt,
      updatedAt: menuItem.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateMenuItemDto) {
    const menuItem = await this.updateMenuItemUseCase.execute(id, dto);
    return {
      id: menuItem.id,
      shopId: menuItem.shopId,
      name: menuItem.name,
      price: menuItem.price,
    };
  }
}
