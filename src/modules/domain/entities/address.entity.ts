// src/domain/entities/address.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Address {
  private constructor(
    public readonly id: string,
    public entityId: string,
    public entityType: 'CUSTOMER' | 'SHOP',
    public formattedAddress: string,
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public postalCode: string,
    public latitude: number,
    public longitude: number,
    public isDefault: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validateCoordinates(latitude, longitude);
  }

  private validateCoordinates(latitude: number, longitude: number): void {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180');
    }
  }

  static create(data: {
    id?: string;
    entityId: string;
    entityType: 'CUSTOMER' | 'SHOP';
    formattedAddress: string;
    street:string;
     city: string,
     state: string,
     country: string,
     postalCode: string,
    latitude: number;
    longitude: number;
    isDefault?: boolean;
  }): Address {
    return new Address(
      data.id || uuidv4(),
      data.entityId,
      data.entityType,
      data.formattedAddress,
      data.street,
      data.city,
      data.state,
      data.country,
      data.postalCode,
      data.latitude,
      data.longitude,
      data.isDefault || false,
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      formattedAddress: string;
      latitude: number;
      longitude: number;
      isDefault: boolean;
    }>,
  ): void {
    if (data.formattedAddress) this.formattedAddress = data.formattedAddress;
    if (data.latitude !== undefined && data.longitude !== undefined) {
      this.validateCoordinates(data.latitude, data.longitude);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    }
    if (data.isDefault !== undefined) this.isDefault = data.isDefault;
    this.updatedAt = new Date();
  }
}
