// src/application/use-cases/address/list-addresses.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../../../domain/repositories/address.repository';
import { Address } from '../../../domain/entities/address.entity';

@Injectable()
export class ListAddressesUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(
    entityId: string,
    entityType: 'CUSTOMER' | 'SHOP',
  ): Promise<Address[]> {
    return this.addressRepository.findByEntityId(entityId, entityType);
  }
}
