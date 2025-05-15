export class Recommendation {
  constructor(
    public id: string,
    public userId: string,
    public menuItemId: string,
    public score: number,
    public createdAt: Date,
  ) {}
}
