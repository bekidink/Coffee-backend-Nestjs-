import { Staff } from '../domain/staff.entity';
import { StaffRepository } from '../domain/staff-repository.interface';

export interface GetStaffUseCase {
  execute(id: string): Promise<Staff>;
}

export class GetStaffUseCaseImpl implements GetStaffUseCase {
  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(id: string): Promise<Staff> {
    const staff = await this.staffRepository.findById(id);
    if (!staff) {
      throw new Error('Staff not found');
    }
    return staff;
  }
}
