// src/application/dtos/inventory.dto.ts
export class CreateOrUpdateInventoryDto {
  productId: string;
  shopId: string;
  stock: number;
}

export class ReduceStockDto {
  productId: string;
  shopId: string;
  quantity: number;
}

export class CheckStockDto {
  productId: string;
  shopId: string;
  quantity: number;
}
