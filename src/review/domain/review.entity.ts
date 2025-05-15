export class Review {
  constructor(
    public id: string,
    public userId: string,
    public shopId: string,
    public menuItemId: string | null,
    public rating: number,
    public comment: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
