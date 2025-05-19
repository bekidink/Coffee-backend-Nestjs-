// src/infrastructure/repositories/prisma-customer.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class PrismaCustomerRepository implements ICustomerRepository {
  constructor(private prisma: PrismaService) {}

  async save(customer: Customer): Promise<Customer> {
    const data = await this.prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        address: customer.address,
        role: customer.role,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      },
    });
    return Customer.create(data);
  }

  async findById(id: string): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({ where: { id } });
    return data ? Customer.create(data) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const data = await this.prisma.customer.findUnique({ where: { email } });
    return data ? Customer.create(data) : null;
  }

  async findAll(): Promise<Customer[]> {
    const data = await this.prisma.customer.findMany();
    return data.map((item) => Customer.create(item));
  }

  async update(customer: Customer): Promise<Customer> {
    const data = await this.prisma.customer.update({
      where: { id: customer.id },
      data: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        updatedAt: customer.updatedAt,
      },
    });
    return Customer.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
