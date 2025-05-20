// src/presentation/modules/address.module.ts
import { Module } from '@nestjs/common';
import { AddressController } from '../controllers/address.controller';
import { CreateAddressUseCase } from '../../application/use-cases/address/create-address.use-case';
import { UpdateAddressUseCase } from '../../application/use-cases/address/update-address.use-case';
import { DeleteAddressUseCase } from '../../application/use-cases/address/delete-address.use-case';
import { ListAddressesUseCase } from '../../application/use-cases/address/list-addresses.use-case';
import { FindNearbyShopsUseCase } from '../../application/use-cases/address/find-nearby-shops.use-case';
import { CalculateDistanceUseCase } from '../../application/use-cases/address/calculate-distance.use-case';
import { PrismaAddressRepository } from '../../infrastructure/repositories/prisma-address.repository';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service';
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
  controllers: [AddressController],
  providers: [
    CreateAddressUseCase,
    UpdateAddressUseCase,
    DeleteAddressUseCase,
    ListAddressesUseCase,
    FindNearbyShopsUseCase,
    CalculateDistanceUseCase,
    GeocodingService,
    PrismaService,
    {
      provide: 'IAddressRepository',
      useClass: PrismaAddressRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'IShopRepository',
      useClass: PrismaShopRepository,
    },
  ],
})
export class AddressModule {}
