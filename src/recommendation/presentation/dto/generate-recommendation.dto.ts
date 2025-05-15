import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class GenerateRecommendationDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  @IsPositive()
  limit: number;
}
