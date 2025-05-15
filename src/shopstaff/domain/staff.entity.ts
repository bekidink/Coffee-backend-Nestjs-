export class Staff {
  constructor(
    public id: string,
    public userId: string,
    public shopId: string,
    public role: 'BARISTA' | 'MANAGER' | 'CASHIER',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
