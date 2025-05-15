import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('loyalty_accounts')
export class LoyaltyTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  points: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
