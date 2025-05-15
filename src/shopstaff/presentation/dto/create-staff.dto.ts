import { IsUUID, IsIn } from 'class-validator';

export class CreateStaffDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  shopId: string;

  @IsIn(['BARISTA', 'MANAGER', 'CASHIER'])
  role: 'BARISTA' | 'MANAGER' | 'CASHIER';
}
