// src/infrastructure/repositories/prisma-vendor.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IVendorRepository } from '../../domain/repositories/vendor.repository';
import { Vendor } from '../../domain/entities/vendor.entity';

@Injectable()
export class PrismaVendorRepository implements IVendorRepository {
  constructor(private prisma: PrismaService) {}

  async save(vendor: Vendor): Promise<Vendor> {
    const data = await this.prisma.vendor.create({
      data: {
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        password: vendor.password,
        // phone: vendor.phone,
        // logoUrl: vendor.logoUrl,
        // status: vendor.status,
        role: vendor.role,
        createdAt: vendor.createdAt,
        updatedAt: vendor.updatedAt,
      },
    });
    return Vendor.create(data);
  }

  async findById(id: string): Promise<Vendor | null> {
    const data = await this.prisma.vendor.findUnique({ where: { id } });
    return data ? Vendor.create(data) : null;
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    const data = await this.prisma.vendor.findUnique({ where: { email } });
    return data ? Vendor.create(data) : null;
  }

  async findAll(): Promise<Vendor[]> {
    const data = await this.prisma.vendor.findMany();
    return data.map((item) => Vendor.create(item));
  }

  async update(vendor: Vendor): Promise<Vendor> {
    const data = await this.prisma.vendor.update({
      where: { id: vendor.id },
      data: {
        name: vendor.name,
        // phone: vendor.phone,
        // logoUrl: vendor.logoUrl,
        // status: vendor.status,
        updatedAt: vendor.updatedAt,
      },
    });
    return Vendor.create(data);
  }
}
