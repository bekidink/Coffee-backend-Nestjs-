import { IsEmail, IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsIn(['CUSTOMER', 'VENDOR', 'ADMIN'])
  role?: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
}
