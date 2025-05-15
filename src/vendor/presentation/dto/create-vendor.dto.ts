import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateVendorDto {
  @IsUUID()
  userId: string;

  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;
}
