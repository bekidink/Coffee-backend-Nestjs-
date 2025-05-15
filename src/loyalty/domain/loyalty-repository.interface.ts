import { Loyalty } from './loyalty.entity';

export interface LoyaltyRepository {
  findById(id: string): Promise<Loyalty | null>;
  findByUserId(userId: string): Promise<Loyalty | null>;
  save(loyalty: Loyalty): Promise<void>;
  update(loyalty: Loyalty): Promise<void>;
}
