import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reviews')
export class ReviewTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  shopId: string;

  @Column({ nullable: true })
  menuItemId: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
