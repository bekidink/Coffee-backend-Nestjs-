// src/application/dtos/address.dto.ts
export class CreateAddressDto {
  entityId: string;
  entityType: 'CUSTOMER' | 'SHOP';
  formattedAddress: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export class UpdateAddressDto {
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export class FindNearbyShopsDto {
  latitude: number;
  longitude: number;
  radiusKm: number;
}
