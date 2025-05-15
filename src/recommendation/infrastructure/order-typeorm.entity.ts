import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  menuItemId: string;

  @Column()
  createdAt: Date;
}
