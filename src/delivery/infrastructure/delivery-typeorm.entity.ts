import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('deliveries')
export class DeliveryTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  orderId: string;

  @Column()
  shopId: string;

  @Column()
  customerId: string;

  @Column({ nullable: true })
  deliveryAgentId: string;

  @Column()
  status:
    | 'PENDING'
    | 'ASSIGNED'
    | 'PICKED_UP'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'CANCELLED';

  @Column()
  deliveryAddress: string;

  @Column({ nullable: true })
  estimatedDeliveryTime: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
