import { IsOptional, IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsIn(['PLACED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'])
  status?: 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
}
