export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
