// src/application/use-cases/vendor/approve-vendor.use-case.ts
import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { ApproveVendorDto } from '../../dtos/vendor.dto';
import { Vendor } from 'src/modules/domain/entities/vendor.entity';

@Injectable()
export class ApproveVendorUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(dto: ApproveVendorDto): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(dto.vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    vendor.update({ status: dto.status });
    return this.vendorRepository.update(vendor);
  }
}
