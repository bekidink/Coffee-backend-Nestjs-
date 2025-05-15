export class Inventory {
  constructor(
    public id: string,
    public shopId: string,
    public menuItemId: string | null,
    public name: string,
    public quantity: number,
    public unit: string,
    public lowStockThreshold: number | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
