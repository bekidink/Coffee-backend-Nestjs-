// src/application/use-cases/address/find-nearby-shops.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';
import { FindNearbyShopsDto } from '../../dtos/address.dto';
import { Address } from '../../../domain/entities/address.entity';

@Injectable()
export class FindNearbyShopsUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(dto: FindNearbyShopsDto): Promise<Address[]> {
    return this.addressRepository.findNearbyShops(
      dto.latitude,
      dto.longitude,
      dto.radiusKm,
    );
  }
}
