import { IsUUID, IsArray, IsObject, Min } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  shopId: string;

  @IsArray()
  @IsObject({ each: true })
  items: { menuItemId: string; quantity: number; unitPrice: number }[];
}
