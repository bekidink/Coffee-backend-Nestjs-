import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('recommendations')
export class RecommendationTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  menuItemId: string;

  @Column()
  score: number;

  @Column()
  createdAt: Date;
}
