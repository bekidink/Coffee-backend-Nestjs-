import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateShopDto {
  @IsOptional()
  @IsString()
  name?: string;

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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
