// src/application/use-cases/address/create-address.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { Address } from '../../../domain/entities/address.entity';
import { CreateAddressDto } from '../../dtos/address.dto';
import { GeocodingService } from '../../../infrastructure/geocoding/geocoding.service';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    private addressRepository: IAddressRepository,
    private customerRepository: ICustomerRepository,
    private shopRepository: IShopRepository,
    private geocodingService: GeocodingService,
  ) {}

  async execute(dto: CreateAddressDto): Promise<Address> {
    // Validate entity
    if (dto.entityType === 'CUSTOMER') {
      const customer = await this.customerRepository.findById(dto.entityId);
      if (!customer) throw new Error('Customer not found');
    } else if (dto.entityType === 'SHOP') {
      const shop = await this.shopRepository.findById(dto.entityId);
      if (!shop) throw new Error('Shop not found');
    } else {
      throw new Error('Invalid entity type');
    }

    // Get coordinates from Geocoding API if not provided
    let { latitude, longitude } = dto;
    if (!latitude || !longitude) {
      const geocodeResult = await this.geocodingService.geocode(
        dto.formattedAddress,
      );
      latitude = geocodeResult.latitude;
      longitude = geocodeResult.longitude;
    }

    // Ensure only one default address per entity
    if (dto.isDefault) {
      const existingDefault =
        await this.addressRepository.findDefaultByEntityId(
          dto.entityId,
          dto.entityType,
        );
      if (existingDefault) {
        existingDefault.update({ isDefault: false });
        await this.addressRepository.update(existingDefault);
      }
    }

    const address = Address.create({
      entityId: dto.entityId,
      entityType: dto.entityType,
      formattedAddress: dto.formattedAddress,
      latitude,
      longitude,
      isDefault: dto.isDefault || false,
    });

    return this.addressRepository.save(address);
  }
}
