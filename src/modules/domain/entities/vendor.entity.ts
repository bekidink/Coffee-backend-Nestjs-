// src/domain/entities/vendor.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Vendor {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string | null,
    public logoUrl: string | null,
    public status: string,
    public role: 'ADMIN' | 'VENDOR' | 'CUSTOMER',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    logoUrl?: string;
    status?: string;
    role?: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  }): Vendor {
    return new Vendor(
      data.id || uuidv4(),
      data.name,
      data.email,
      data.password,
      data.phone || null,
      data.logoUrl || null,
      data.status || 'PENDING',
      data.role || 'VENDOR',
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      name: string;
      phone: string;
      logoUrl: string;
      status: string;
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.logoUrl !== undefined) this.logoUrl = data.logoUrl;
    if (data.status) this.status = data.status;
    this.updatedAt = new Date();
  }
}
