// src/application/use-cases/customer/update-customer.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { UpdateCustomerDto } from '../../dtos/customer.dto';
import { Customer } from 'src/modules/domain/entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(customerId: string, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.update(dto);
    return this.customerRepository.update(customer);
  }
}
