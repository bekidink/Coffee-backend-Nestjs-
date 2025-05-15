import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('inventory')
export class InventoryTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shopId: string;

  @Column({ nullable: true })
  menuItemId: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column({ nullable: true })
  lowStockThreshold: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
