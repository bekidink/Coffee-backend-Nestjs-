// src/application/use-cases/vendor/login-vendor.use-case.ts
import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { LoginVendorDto } from '../../dtos/vendor.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginVendorUseCase {
  constructor(
    private vendorRepository: IVendorRepository,
    private jwtService: JwtService,
  ) {}

  async execute(dto: LoginVendorDto): Promise<{ access_token: string }> {
    const vendor = await this.vendorRepository.findByEmail(dto.email);
    if (!vendor || !(await bcrypt.compare(dto.password, vendor.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: vendor.id, email: vendor.email, role: vendor.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
