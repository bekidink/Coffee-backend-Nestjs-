export class Preference {
  constructor(
    public id: string,
    public userId: string,
    public dietaryRestrictions: string[],
    public favoriteCategories: string[],
    public updatedAt: Date,
  ) {}
}
