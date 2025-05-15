export class Shop {
  constructor(
    public id: string,
    public vendorId: string,
    public name: string,
    public description: string | null,
    public logoUrl: string | null,
    public contactPhone: string | null,
    public contactEmail: string | null,
    public location: object | null, // GeoJSON or structured address
    public operatingHours: object | null, // e.g., { "monday": { "open": "08:00", "close": "18:00" } }
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
