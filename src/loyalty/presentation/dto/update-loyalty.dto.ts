import { IsOptional, IsNumber } from 'class-validator';

export class UpdateLoyaltyDto {
  @IsOptional()
  @IsNumber()
  pointsToAdd?: number;

  @IsOptional()
  @IsNumber()
  pointsToRedeem?: number;
}
