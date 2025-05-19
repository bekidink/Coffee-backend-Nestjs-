// src/presentation/controllers/vendor.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RegisterVendorUseCase } from '../../application/use-cases/vendor/register-vendor.use-case';
import { LoginVendorUseCase } from '../../application/use-cases/vendor/login-vendor.use-case';
import { UpdateVendorUseCase } from '../../application/use-cases/vendor/update-vendor.use-case';
import { ApproveVendorUseCase } from '../../application/use-cases/vendor/approve-vendor.use-case';
import { ListVendorsUseCase } from '../../application/use-cases/vendor/list-vendors.use-case';
import {
  CreateVendorDto,
  LoginVendorDto,
  UpdateVendorDto,
  ApproveVendorDto,
} from '../../application/dtos/vendor.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('vendors')
export class VendorController {
  constructor(
    private registerVendorUseCase: RegisterVendorUseCase,
    private loginVendorUseCase: LoginVendorUseCase,
    private updateVendorUseCase: UpdateVendorUseCase,
    private approveVendorUseCase: ApproveVendorUseCase,
    private listVendorsUseCase: ListVendorsUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateVendorDto) {
    return this.registerVendorUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginVendorDto) {
    return this.loginVendorUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  async update(@Param('id') id: string, @Body() dto: UpdateVendorDto) {
    return this.updateVendorUseCase.execute(id, dto);
  }

  @Patch('approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async approve(@Body() dto: ApproveVendorDto) {
    return this.approveVendorUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'CUSTOMER')
  async list() {
    return this.listVendorsUseCase.execute();
  }
}
