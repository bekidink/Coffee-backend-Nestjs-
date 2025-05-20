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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  NotFoundException,
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
import { ProductService } from 'src/modules/application/services/product.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private assignProductToShopUseCase: AssignProductToShopUseCase,
    private listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @UseInterceptors(FileInterceptor('thumbnail'), FilesInterceptor('images', 10)) // Max 10 images
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    const product = await this.productService.createProduct(
      createProductDto,
      thumbnail,
      images,
    );
    return { product };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('thumbnail'), FilesInterceptor('images', 10))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    const product = await this.productService.updateProduct(
      id,
      updateProductDto,
      thumbnail,
      images,
    );
    return { product };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { product };
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
