export class Payment {
  constructor(
    public id: string,
    public orderId: string,
    public amount: number,
    public status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED',
    public gateway: string,
    public transactionId: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
