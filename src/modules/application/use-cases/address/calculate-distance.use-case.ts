// src/application/use-cases/address/calculate-distance.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';

@Injectable()
export class CalculateDistanceUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(addressId1: string, addressId2: string): Promise<number> {
    const address1 = await this.addressRepository.findById(addressId1);
    const address2 = await this.addressRepository.findById(addressId2);
    if (!address1 || !address2) {
      throw new Error('One or both addresses not found');
    }

    return this.calculateHaversineDistance(
      address1.latitude,
      address1.longitude,
      address2.latitude,
      address2.longitude,
    );
  }

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
}
