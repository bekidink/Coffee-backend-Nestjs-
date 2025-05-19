// src/domain/repositories/customer.repository.ts
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
}
