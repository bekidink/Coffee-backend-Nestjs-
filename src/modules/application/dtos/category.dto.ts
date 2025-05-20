// src/application/dtos/category.dto.ts
export class CreateCategoryDto {
  name: string;
  description?: string;
  parentId?: string;
}

export class UpdateCategoryDto {
  name?: string;
  description?: string;
  parentId?: string | null;
}
