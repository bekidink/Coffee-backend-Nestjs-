// src/domain/entities/customer.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Customer {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string | null,
    public address: string | null,
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
    address?: string;
    role?: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  }): Customer {
    return new Customer(
      data.id || uuidv4(),
      data.name,
      data.email,
      data.password,
      data.phone || null,
      data.address || null,
      data.role || 'CUSTOMER',
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      name: string;
      phone: string;
      address: string;
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
    this.updatedAt = new Date();
  }
}
