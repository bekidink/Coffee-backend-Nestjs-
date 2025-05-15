import {
  IsUUID,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreatePromotionDto {
  @IsUUID()
  shopId: string;

  @IsOptional()
  @IsUUID()
  menuItemId?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['PERCENTAGE', 'FIXED_AMOUNT', 'BOGO'])
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';

  @IsNumber()
  discountValue: number;

  @IsDateString()
  validFrom: Date;

  @IsDateString()
  validUntil: Date;
}
