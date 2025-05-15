import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('menu_items')
export class MenuItemTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shopId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  category: string;

  @Column()
  isAvailable: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
