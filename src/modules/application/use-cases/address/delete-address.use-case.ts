// src/application/use-cases/address/delete-address.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';

@Injectable()
export class DeleteAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(addressId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new Error('Address not found');
    }

    await this.addressRepository.delete(addressId);
  }
}
