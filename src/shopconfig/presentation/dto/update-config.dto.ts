import { IsOptional, IsArray, IsBoolean, IsObject } from 'class-validator';

export class UpdateConfigDto {
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  operatingHours?: { day: string; open: string; close: string }[];

  @IsOptional()
  @IsBoolean()
  deliveryEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  pickupEnabled?: boolean;
}
