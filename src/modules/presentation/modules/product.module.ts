// src/presentation/modules/product.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/product.controller';
import { CreateProductUseCase } from '../../application/use-cases/product/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/product/update-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/product/delete-product.use-case';
import { AssignProductToShopUseCase } from '../../application/use-cases/product/assign-product-to-shop.use-case';
import { ListProductsUseCase } from '../../application/use-cases/product/list-products.use-case';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { PrismaCategoryRepository } from '../../infrastructure/repositories/prisma-category.repository';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    AssignProductToShopUseCase,
    ListProductsUseCase,
    PrismaService,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
  ],
})
export class ProductModule {}
