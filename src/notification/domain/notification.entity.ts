export class Notification {
  constructor(
    public id: string,
    public userId: string,
    public type: 'ORDER_UPDATE' | 'PROMOTION' | 'LOW_STOCK' | 'GENERAL',
    public message: string,
    public isRead: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
