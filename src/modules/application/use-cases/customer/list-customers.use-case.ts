// src/application/use-cases/customer/list-customers.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { Customer } from '../../../domain/entities/customer.entity';

@Injectable()
export class ListCustomersUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
