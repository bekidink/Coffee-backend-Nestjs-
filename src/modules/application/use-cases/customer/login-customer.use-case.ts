// src/application/use-cases/customer/login-customer.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository';
import { LoginCustomerDto } from '../../dtos/customer.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginCustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository,
    private jwtService: JwtService,
  ) {}

  async execute(dto: LoginCustomerDto): Promise<{ access_token: string }> {
    const customer = await this.customerRepository.findByEmail(dto.email);
    if (!customer || !(await bcrypt.compare(dto.password, customer.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: customer.id,
      email: customer.email,
      role: customer.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
