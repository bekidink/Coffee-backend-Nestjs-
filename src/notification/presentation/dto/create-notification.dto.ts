import { IsUUID, IsString, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @IsIn(['ORDER_UPDATE', 'PROMOTION', 'LOW_STOCK', 'GENERAL'])
  type: 'ORDER_UPDATE' | 'PROMOTION' | 'LOW_STOCK' | 'GENERAL';

  @IsString()
  message: string;
}