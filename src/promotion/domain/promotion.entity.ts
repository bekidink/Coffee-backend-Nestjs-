export class Promotion {
  constructor(
    public id: string,
    public shopId: string,
    public menuItemId: string | null,
    public title: string,
    public description: string | null,
    public discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO',
    public discountValue: number,
    public validFrom: Date,
    public validUntil: Date,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
