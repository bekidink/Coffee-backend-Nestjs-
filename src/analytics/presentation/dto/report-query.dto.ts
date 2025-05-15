import { IsDateString, IsUUID, IsOptional } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
