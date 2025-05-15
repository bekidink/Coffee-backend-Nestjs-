import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('locations')
export class LocationTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shopId: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
