// src/application/use-cases/vendor/register-vendor.use-case.ts
import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { Vendor } from '../../../domain/entities/vendor.entity';
import { CreateVendorDto } from '../../dtos/vendor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterVendorUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(dto: CreateVendorDto): Promise<Vendor> {
    const existingVendor = await this.vendorRepository.findByEmail(dto.email);
    if (existingVendor) {
      throw new Error('Vendor with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const vendor = Vendor.create({
      ...dto,
      password: hashedPassword,
    });
    return this.vendorRepository.save(vendor);
  }
}
