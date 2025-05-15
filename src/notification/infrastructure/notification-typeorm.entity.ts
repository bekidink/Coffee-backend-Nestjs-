import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('notifications')
export class NotificationTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  type: 'ORDER_UPDATE' | 'PROMOTION' | 'LOW_STOCK' | 'GENERAL';

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
