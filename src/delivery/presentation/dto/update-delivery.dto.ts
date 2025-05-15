import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsIn,
} from 'class-validator';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsIn([
    'PENDING',
    'ASSIGNED',
    'PICKED_UP',
    'IN_TRANSIT',
    'DELIVERED',
    'CANCELLED',
  ])
  status?:
    | 'PENDING'
    | 'ASSIGNED'
    | 'PICKED_UP'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'CANCELLED';

  @IsOptional()
  @IsUUID()
  deliveryAgentId?: string;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryTime?: Date;
}
