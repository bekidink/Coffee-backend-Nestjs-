import { IsUUID, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  shopId: string;

  @IsOptional()
  @IsUUID()
  menuItemId?: string;

  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
