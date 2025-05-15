export class MenuItem {
  constructor(
    public id: string,
    public shopId: string,
    public name: string,
    public description: string | null,
    public price: number,
    public category: string | null,
    public isAvailable: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
