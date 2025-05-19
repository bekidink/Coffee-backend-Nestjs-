// src/domain/entities/shop.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Shop {
  private constructor(
    public readonly id: string,
    public vendorId: string,
    public name: string,
    public description: string | null,
    public operatingHours: string | null,
    public status: 'ACTIVE' | 'INACTIVE' | 'PENDING',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    vendorId: string;
    name: string;
    description?: string;
    operatingHours?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  }): Shop {
    return new Shop(
      data.id || uuidv4(),
      data.vendorId,
      data.name,
      data.description || null,
      data.operatingHours || null,
      data.status || 'PENDING',
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      name: string;
      description: string;
      operatingHours: string;
      status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.operatingHours !== undefined)
      this.operatingHours = data.operatingHours;
    if (data.status) this.status = data.status;
    this.updatedAt = new Date();
  }
}
