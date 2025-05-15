import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  shopId: string;

  @Column()
  totalAmount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
