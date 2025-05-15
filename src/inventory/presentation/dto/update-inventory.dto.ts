import { IsOptional, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  lowStockThreshold?: number;
}
