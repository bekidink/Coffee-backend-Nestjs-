import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('shops')
export class ShopTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  vendorId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ type: 'jsonb', nullable: true })
  location: object;

  @Column({ type: 'jsonb', nullable: true })
  operatingHours: object;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
