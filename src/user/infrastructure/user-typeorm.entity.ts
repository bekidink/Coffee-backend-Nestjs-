import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
