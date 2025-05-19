// src/application/dtos/customer.dto.ts
export class CreateCustomerDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export class LoginCustomerDto {
  email: string;
  password: string;
}

export class UpdateCustomerDto {
  name?: string;
  phone?: string;
  address?: string;
}
