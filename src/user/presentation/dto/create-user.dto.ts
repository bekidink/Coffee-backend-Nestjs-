import { IsEmail, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsIn(['CUSTOMER', 'VENDOR', 'ADMIN'])
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
}
