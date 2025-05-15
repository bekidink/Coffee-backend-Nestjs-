import { Vendor } from '../domain/vendor.entity';
import { VendorRepository } from '../domain/vendor-repository.interface';

export interface UpdateVendorUseCase {
  execute(
    id: string,
    dto: {
      businessName?: string;
      contactPhone?: string;
      contactEmail?: string;
    },
  ): Promise<Vendor>;
}

export class UpdateVendorUseCaseImpl implements UpdateVendorUseCase {
  constructor(private readonly vendorRepository: VendorRepository) {}

  async execute(
    id: string,
    dto: {
      businessName?: string;
      contactPhone?: string;
      contactEmail?: string;
    },
  ): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    vendor.businessName = dto.businessName || vendor.businessName;
    vendor.contactPhone =
      dto.contactPhone !== undefined ? dto.contactPhone : vendor.contactPhone;
    vendor.contactEmail =
      dto.contactEmail !== undefined ? dto.contactEmail : vendor.contactEmail;
    vendor.updatedAt = new Date();

    await this.vendorRepository.update(vendor);
    return vendor;
  }
}
