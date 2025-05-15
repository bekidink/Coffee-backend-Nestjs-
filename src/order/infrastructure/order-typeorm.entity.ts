import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  shopId: string;

  @Column({ type: 'jsonb' })
  items: { menuItemId: string; quantity: number; unitPrice: number }[];

  @Column()
  totalAmount: number;

  @Column()
  status: 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
