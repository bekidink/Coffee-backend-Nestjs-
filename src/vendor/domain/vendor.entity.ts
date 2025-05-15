export class Vendor {
  constructor(
    public id: string,
    public userId: string,
    public businessName: string,
    public contactPhone: string | null,
    public contactEmail: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
