import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class PaymentTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  orderId: string;

  @Column()
  amount: number;

  @Column()
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

  @Column()
  gateway: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
