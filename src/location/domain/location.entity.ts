export class Location {
  constructor(
    public id: string,
    public shopId: string,
    public address: string,
    public latitude: number,
    public longitude: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
