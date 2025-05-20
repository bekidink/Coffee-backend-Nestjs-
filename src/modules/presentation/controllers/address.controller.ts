// src/presentation/controllers/address.controller.ts
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
  Req,
} from '@nestjs/common';
import { CreateAddressUseCase } from '../../application/use-cases/address/create-address.use-case';
import { UpdateAddressUseCase } from '../../application/use-cases/address/update-address.use-case';
import { DeleteAddressUseCase } from '../../application/use-cases/address/delete-address.use-case';
import { ListAddressesUseCase } from '../../application/use-cases/address/list-addresses.use-case';
import { FindNearbyShopsUseCase } from '../../application/use-cases/address/find-nearby-shops.use-case';
import { CalculateDistanceUseCase } from '../../application/use-cases/address/calculate-distance.use-case';
import {
  CreateAddressDto,
  UpdateAddressDto,
  FindNearbyShopsDto,
} from '../../application/dtos/address.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { IShopRepository } from 'src/modules/domain/repositories/shop.repository';
import { IAddressRepository } from 'src/modules/domain/repositories/address.repository';

@Controller('addresses')
export class AddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
    private deleteAddressUseCase: DeleteAddressUseCase,
    private listAddressesUseCase: ListAddressesUseCase,
    private findNearbyShopsUseCase: FindNearbyShopsUseCase,
    private calculateDistanceUseCase: CalculateDistanceUseCase,
    private shopRepository: IShopRepository,
    private addressRepository: IAddressRepository,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async create(@Body() dto: CreateAddressDto, @Req() req) {
    if (
      dto.entityType === 'CUSTOMER' &&
      req.user.role === 'CUSTOMER' &&
      dto.entityId !== req.user.id
    ) {
      throw new Error('Customers can only create addresses for themselves');
    }
    if (dto.entityType === 'SHOP' && req.user.role === 'VENDOR') {
      const shop = await this.shopRepository.findById(dto.entityId);
      if (shop?.vendorId !== req.user.id) {
        throw new Error('Vendors can only create addresses for their shops');
      }
    }
    return this.createAddressUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
    @Req() req,
  ) {
    const address = await this.addressRepository.findById(id);
    if (!address) throw new Error('Address not found');
    if (
      address.entityType === 'CUSTOMER' &&
      req.user.role === 'CUSTOMER' &&
      address.entityId !== req.user.id
    ) {
      throw new Error('Customers can only update their own addresses');
    }
    if (address.entityType === 'SHOP' && req.user.role === 'VENDOR') {
      const shop = await this.shopRepository.findById(address.entityId);
      if (shop?.vendorId !== req.user.id) {
        throw new Error('Vendors can only update addresses for their shops');
      }
    }
    return this.updateAddressUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async delete(@Param('id') id: string, @Req() req) {
    const address = await this.addressRepository.findById(id);
    if (!address) throw new Error('Address not found');
    if (
      address.entityType === 'CUSTOMER' &&
      req.user.role === 'CUSTOMER' &&
      address.entityId !== req.user.id
    ) {
      throw new Error('Customers can only delete their own addresses');
    }
    if (address.entityType === 'SHOP' && req.user.role === 'VENDOR') {
      const shop = await this.shopRepository.findById(address.entityId);
      if (shop?.vendorId !== req.user.id) {
        throw new Error('Vendors can only delete addresses for their shops');
      }
    }
    return this.deleteAddressUseCase.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async list(
    @Query('entityId') entityId: string,
    @Query('entityType') entityType: 'CUSTOMER' | 'SHOP',
    @Req() req,
  ) {
    if (
      entityType === 'CUSTOMER' &&
      req.user.role === 'CUSTOMER' &&
      entityId !== req.user.id
    ) {
      throw new Error('Customers can only list their own addresses');
    }
    if (entityType === 'SHOP' && req.user.role === 'VENDOR') {
      const shop = await this.shopRepository.findById(entityId);
      if (shop?.vendorId !== req.user.id) {
        throw new Error('Vendors can only list addresses for their shops');
      }
    }
    return this.listAddressesUseCase.execute(entityId, entityType);
  }

  @Get('nearby')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  async findNearby(@Query() dto: FindNearbyShopsDto) {
    return this.findNearbyShopsUseCase.execute(dto);
  }

  @Get('distance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async calculateDistance(
    @Query('addressId1') addressId1: string,
    @Query('addressId2') addressId2: string,
  ) {
    return this.calculateDistanceUseCase.execute(addressId1, addressId2);
  }
}
