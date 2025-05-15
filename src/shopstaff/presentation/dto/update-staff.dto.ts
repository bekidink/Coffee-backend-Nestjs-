import { IsOptional, IsIn } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsIn(['BARISTA', 'MANAGER', 'CASHIER'])
  role?: 'BARISTA' | 'MANAGER' | 'CASHIER';
}
