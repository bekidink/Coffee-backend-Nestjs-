// src/application/use-cases/address/update-address.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';
import { UpdateAddressDto } from '../../dtos/address.dto';
import { GeocodingService } from '../../../infrastructure/geocoding/geocoding.service';

@Injectable()
export class UpdateAddressUseCase {
  constructor(
    private addressRepository: IAddressRepository,
    private geocodingService: GeocodingService,
  ) {}

  async execute(addressId: string, dto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new Error('Address not found');
    }

    // Update coordinates if new address provided
    let { latitude, longitude } = dto;
    if (dto.formattedAddress && (!dto.latitude || !dto.longitude)) {
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
          address.entityId,
          address.entityType,
        );
      if (existingDefault && existingDefault.id !== addressId) {
        existingDefault.update({ isDefault: false });
        await this.addressRepository.update(existingDefault);
      }
    }

    address.update({ ...dto, latitude, longitude });
    return this.addressRepository.update(address);
  }
}
