// src/application/dtos/product.dto.ts
export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  vendorId: string;
  shopId: string; // Initial shop assignment
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
}

export class AssignProductToShopDto {
  productId: string;
  shopId: string;
}
