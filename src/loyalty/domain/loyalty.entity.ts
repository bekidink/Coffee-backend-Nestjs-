export class Loyalty {
  constructor(
    public id: string,
    public userId: string,
    public points: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
