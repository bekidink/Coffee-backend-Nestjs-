import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateShopDto {
  @IsUUID()
  vendorId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  location?: object;

  @IsOptional()
  operatingHours?: object;
}
