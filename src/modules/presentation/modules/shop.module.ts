// src/presentation/modules/shop.module.ts
import { Module } from '@nestjs/common';
import { ShopController } from '../controllers/shop.controller';
import { CreateShopUseCase } from '../../application/use-cases/shop/create-shop.use-case';
import { UpdateShopUseCase } from '../../application/use-cases/shop/update-shop.use-case';
import { ListShopsUseCase } from '../../application/use-cases/shop/list-shops.use-case';
import { ChangeShopStatusUseCase } from '../../application/use-cases/shop/change-shop-status.use-case';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
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
  controllers: [ShopController],
  providers: [
    CreateShopUseCase,
    UpdateShopUseCase,
    ListShopsUseCase,
    ChangeShopStatusUseCase,
    PrismaService,
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
  ],
})
export class ShopModule {}
