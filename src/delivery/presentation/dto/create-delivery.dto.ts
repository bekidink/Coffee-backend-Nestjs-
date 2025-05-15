import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateDeliveryDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  shopId: string;

  @IsUUID()
  customerId: string;

  @IsString()
  deliveryAddress: string;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryTime?: Date;
}
