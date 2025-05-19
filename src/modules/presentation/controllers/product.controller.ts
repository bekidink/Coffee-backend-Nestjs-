// src/presentation/controllers/product.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';
import { AssignProductToShopUseCase } from '../../application/use-cases/product/assign-product-to-shop.use-case';
import { ListProductsUseCase } from '../../application/use-cases/product/list-products.use-case';
import {
  CreateProductDto,
  UpdateProductDto,
  AssignProductToShopDto,
} from '../../application/dtos/product.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private assignProductToShopUseCase: AssignProductToShopUseCase,
    private listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async create(@Body() dto: CreateProductDto) {
    return this.createProductUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }

  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async assignToShop(@Body() dto: AssignProductToShopDto) {
    return this.assignProductToShopUseCase.execute(dto);
  }

  @Get()
  async list(
    @Query('shopId') shopId?: string,
    @Query('vendorId') vendorId?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.listProductsUseCase.execute({ shopId, vendorId, categoryId });
  }
}
