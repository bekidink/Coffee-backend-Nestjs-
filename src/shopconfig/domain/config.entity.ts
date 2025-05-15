export class Config {
  constructor(
    public id: string,
    public shopId: string,
    public operatingHours: { day: string; open: string; close: string }[],
    public deliveryEnabled: boolean,
    public pickupEnabled: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
