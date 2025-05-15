import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('vendors')
export class VendorTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
