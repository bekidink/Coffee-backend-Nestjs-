export class Order {
  constructor(
    public id: string,
    public userId: string,
    public shopId: string,
    public items: { menuItemId: string; quantity: number; unitPrice: number }[],
    public totalAmount: number,
    public status: 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
