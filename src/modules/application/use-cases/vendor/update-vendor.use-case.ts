// src/application/use-cases/vendor/update-vendor.use-case.ts
import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { UpdateVendorDto } from '../../dtos/vendor.dto';
import { Vendor } from 'src/modules/domain/entities/vendor.entity';

@Injectable()
export class UpdateVendorUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(vendorId: string, dto: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    vendor.update(dto);
    return this.vendorRepository.update(vendor);
  }
}
