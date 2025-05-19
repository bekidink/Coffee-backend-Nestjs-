// src/application/use-cases/customer/register-customer.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { Customer } from '../../../domain/entities/customer.entity';
import { CreateCustomerDto } from '../../dtos/customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findByEmail(
      dto.email,
    );
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const customer = Customer.create({
      ...dto,
      password: hashedPassword,
    });
    return this.customerRepository.save(customer);
  }
}
