import { IsOptional, IsIn } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsIn(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'])
  status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
}
