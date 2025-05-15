import { Staff } from '../domain/staff.entity';
import { StaffRepository } from '../domain/staff-repository.interface';

export interface UpdateStaffUseCase {
  execute(
    id: string,
    dto: { role?: 'BARISTA' | 'MANAGER' | 'CASHIER' },
  ): Promise<Staff>;
}

export class UpdateStaffUseCaseImpl implements UpdateStaffUseCase {
  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(
    id: string,
    dto: { role?: 'BARISTA' | 'MANAGER' | 'CASHIER' },
  ): Promise<Staff> {
    const staff = await this.staffRepository.findById(id);
    if (!staff) {
      throw new Error('Staff not found');
    }

    staff.role = dto.role || staff.role;
    staff.updatedAt = new Date();

    await this.staffRepository.update(staff);
    return staff;
  }
}
