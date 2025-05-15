import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('shop_configs')
export class ConfigTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shopId: string;

  @Column('jsonb')
  operatingHours: { day: string; open: string; close: string }[];

  @Column()
  deliveryEnabled: boolean;

  @Column()
  pickupEnabled: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
