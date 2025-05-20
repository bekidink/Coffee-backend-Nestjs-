// src/presentation/controllers/category.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category.use-case';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category.use-case';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category.use-case';
import { ListCategoriesUseCase } from '../../application/use-cases/category/list-categories.use-case';
import { GetCategoryUseCase } from '../../application/use-cases/category/get-category.use-case';
import { CreateCategoryDto, UpdateCategoryDto } from '../../application/dtos/category.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('categories')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private getCategoryUseCase: GetCategoryUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async create(@Body() dto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR', 'ADMIN')
  async delete(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }

  @Get()
  async list() {
    return this.listCategoriesUseCase.execute();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getCategoryUseCase.execute(id);
  }
}
