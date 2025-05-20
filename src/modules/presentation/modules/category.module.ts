// src/presentation/modules/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/category.controller';
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category.use-case';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category.use-case';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category.use-case';
import { ListCategoriesUseCase } from '../../application/use-cases/category/list-categories.use-case';
import { GetCategoryUseCase } from '../../application/use-cases/category/get-category.use-case';
import { PrismaCategoryRepository } from '../../infrastructure/repositories/prisma-category.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
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
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    ListCategoriesUseCase,
    GetCategoryUseCase,
    PrismaService,
    {
      provide: 'ICategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class CategoryModule {}
