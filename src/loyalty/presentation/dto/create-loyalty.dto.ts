import { IsUUID } from 'class-validator';

export class CreateLoyaltyDto {
  @IsUUID()
  userId: string;
}
