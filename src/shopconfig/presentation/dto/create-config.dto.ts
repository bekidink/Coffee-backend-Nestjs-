import {
  IsUUID,
  IsArray,
  IsBoolean,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateConfigDto {
  @IsUUID()
  shopId: string;

  @IsArray()
  @IsObject({ each: true })
  operatingHours: { day: string; open: string; close: string }[];

  @IsBoolean()
  deliveryEnabled: boolean;

  @IsBoolean()
  pickupEnabled: boolean;
}
