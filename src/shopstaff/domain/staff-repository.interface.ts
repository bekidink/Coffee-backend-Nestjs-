import { Staff } from './staff.entity';

export interface StaffRepository {
  findById(id: string): Promise<Staff | null>;
  findByShopId(shopId: string): Promise<Staff[]>;
  findByUserId(userId: string): Promise<Staff | null>;
  save(staff: Staff): Promise<void>;
  update(staff: Staff): Promise<void>;
}
