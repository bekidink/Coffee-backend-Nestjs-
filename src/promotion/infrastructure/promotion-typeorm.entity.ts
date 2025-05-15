import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('promotions')
export class PromotionTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shopId: string;

  @Column({ nullable: true })
  menuItemId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';

  @Column()
  discountValue: number;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
