import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class UpdatePromotionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['PERCENTAGE', 'FIXED_AMOUNT', 'BOGO'])
  discountType?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';

  @IsOptional()
  @IsNumber()
  discountValue?: number;

  @IsOptional()
  @IsDateString()
  validFrom?: Date;

  @IsOptional()
  @IsDateString()
  validUntil?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
