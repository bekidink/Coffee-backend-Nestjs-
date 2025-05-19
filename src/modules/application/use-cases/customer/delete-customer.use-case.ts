// src/application/use-cases/customer/delete-customer.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(customerId: string): Promise<void> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Check for active orders or other constraints if needed
    await this.customerRepository.delete(customerId);
  }
}
