import { Vendor } from '../domain/vendor.entity';
import { VendorRepository } from '../domain/vendor-repository.interface';

export interface GetVendorUseCase {
  execute(id: string): Promise<Vendor>;
}

export class GetVendorUseCaseImpl implements GetVendorUseCase {
  constructor(private readonly vendorRepository: VendorRepository) {}

  async execute(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return vendor;
  }
}
