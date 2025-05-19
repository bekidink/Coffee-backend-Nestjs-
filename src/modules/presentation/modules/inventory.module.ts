// src/presentation/modules/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryController } from '../controllers/inventory.controller';
import { CreateOrUpdateInventoryUseCase } from '../../application/use-cases/inventory/create-or-update-inventory.use-case';
import { ReduceStockUseCase } from '../../application/use-cases/inventory/reduce-stock.use-case';
import { CheckStockUseCase } from '../../application/use-cases/inventory/check-stock.use-case';
import { ListInventoryUseCase } from '../../application/use-cases/inventory/list-inventory.use-case';
import { PrismaInventoryRepository } from '../../infrastructure/repositories/prisma-inventory.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
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
  controllers: [InventoryController],
  providers: [
    CreateOrUpdateInventoryUseCase,
    ReduceStockUseCase,
    CheckStockUseCase,
    ListInventoryUseCase,
    PrismaService,
    {
      provide: 'IInventoryRepository',
      useClass: PrismaInventoryRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
  ],
})
export class InventoryModule {}
