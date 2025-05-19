// src/presentation/controllers/customer.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RegisterCustomerUseCase } from '../../application/use-cases/customer/register-customer.use-case';
import { LoginCustomerUseCase } from '../../application/use-cases/customer/login-customer.use-case';
import { UpdateCustomerUseCase } from '../../application/use-cases/customer/update-customer.use-case';
import { ListCustomersUseCase } from '../../application/use-cases/customer/list-customers.use-case';
import { DeleteCustomerUseCase } from '../../application/use-cases/customer/delete-customer.use-case';
import {
  CreateCustomerDto,
  LoginCustomerDto,
  UpdateCustomerDto,
} from '../../application/dtos/customer.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('customers')
export class CustomerController {
  constructor(
    private registerCustomerUseCase: RegisterCustomerUseCase,
    private loginCustomerUseCase: LoginCustomerUseCase,
    private updateCustomerUseCase: UpdateCustomerUseCase,
    private listCustomersUseCase: ListCustomersUseCase,
    private deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateCustomerDto) {
    return this.registerCustomerUseCase.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginCustomerDto) {
    return this.loginCustomerUseCase.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.updateCustomerUseCase.execute(id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async list() {
    return this.listCustomersUseCase.execute();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'ADMIN')
  async delete(@Param('id') id: string) {
    return this.deleteCustomerUseCase.execute(id);
  }
}
