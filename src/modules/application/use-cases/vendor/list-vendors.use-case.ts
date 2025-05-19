// src/application/use-cases/vendor/list-vendors.use-case.ts
import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { Vendor } from '../../../domain/entities/vendor.entity';

@Injectable()
export class ListVendorsUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(): Promise<Vendor[]> {
    return this.vendorRepository.findAll();
  }
}
