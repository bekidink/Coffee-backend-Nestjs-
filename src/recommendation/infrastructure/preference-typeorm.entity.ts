import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('preferences')
export class PreferenceTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column('text', { array: true })
  dietaryRestrictions: string[];

  @Column('text', { array: true })
  favoriteCategories: string[];

  @Column()
  updatedAt: Date;
}
