import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('shop_staff')
export class StaffTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  shopId: string;

  @Column()
  role: 'BARISTA' | 'MANAGER' | 'CASHIER';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
