// src/presentation/modules/vendor.module.ts
import { Module } from '@nestjs/common';
import { VendorController } from '../controllers/vendor.controller';
import { RegisterVendorUseCase } from '../../application/use-cases/vendor/register-vendor.use-case';
import { LoginVendorUseCase } from '../../application/use-cases/vendor/login-vendor.use-case';
import { UpdateVendorUseCase } from '../../application/use-cases/vendor/update-vendor.use-case';
import { ApproveVendorUseCase } from '../../application/use-cases/vendor/approve-vendor.use-case';
import { ListVendorsUseCase } from '../../application/use-cases/vendor/list-vendors.use-case';
import { PrismaVendorRepository } from '../../infrastructure/repositories/prisma-vendor.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [VendorController],
  providers: [
    RegisterVendorUseCase,
    LoginVendorUseCase,
    UpdateVendorUseCase,
    ApproveVendorUseCase,
    ListVendorsUseCase,
    PrismaService,
    JwtStrategy,
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
  ],
})
export class VendorModule {}
