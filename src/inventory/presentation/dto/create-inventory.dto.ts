import { IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsUUID()
  shopId: string;

  @IsOptional()
  @IsUUID()
  menuItemId?: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsNumber()
  lowStockThreshold?: number;
}
