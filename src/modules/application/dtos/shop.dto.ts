// src/application/dtos/shop.dto.ts
export class CreateShopDto {
  vendorId: string;
  name: string;
  description?: string;
  operatingHours?: string;
}

export class UpdateShopDto {
  name?: string;
  description?: string;
  operatingHours?: string;
}

export class ChangeShopStatusDto {
  shopId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}
