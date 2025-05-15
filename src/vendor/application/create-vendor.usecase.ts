import { Vendor } from '../domain/vendor.entity';
import { VendorRepository } from '../domain/vendor-repository.interface';

export interface CreateVendorUseCase {
  execute(dto: {
    userId: string;
    businessName: string;
    contactPhone?: string;
    contactEmail?: string;
  }): Promise<Vendor>;
}

export class CreateVendorUseCaseImpl implements CreateVendorUseCase {
  constructor(private readonly vendorRepository: VendorRepository) {}

  async execute(dto: {
    userId: string;
    businessName: string;
    contactPhone?: string;
    contactEmail?: string;
  }): Promise<Vendor> {
    const existingVendor = await this.vendorRepository.findByUserId(dto.userId);
    if (existingVendor) {
      throw new Error('Vendor profile already exists for this user');
    }

    const vendor = new Vendor(
      require('uuid').v4(),
      dto.userId,
      dto.businessName,
      dto.contactPhone || null,
      dto.contactEmail || null,
      new Date(),
      new Date(),
    );

    await this.vendorRepository.save(vendor);
    return vendor;
  }
}
