// src/application/dtos/vendor.dto.ts
export class CreateVendorDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  logoUrl?: string;
}

export class LoginVendorDto {
  email: string;
  password: string;
}

export class UpdateVendorDto {
  name?: string;
  phone?: string;
  logoUrl?: string;
}

export class ApproveVendorDto {
  vendorId: string;
  status: 'ACTIVE' | 'REJECTED';
}
