import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePreferencesDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryRestrictions?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteCategories?: string[];
}
