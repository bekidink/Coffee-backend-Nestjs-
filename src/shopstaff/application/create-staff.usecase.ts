import { Staff } from '../domain/staff.entity';
import { StaffRepository } from '../domain/staff-repository.interface';

export interface CreateStaffUseCase {
  execute(dto: {
    userId: string;
    shopId: string;
    role: 'BARISTA' | 'MANAGER' | 'CASHIER';
  }): Promise<Staff>;
}

export class CreateStaffUseCaseImpl implements CreateStaffUseCase {
  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(dto: {
    userId: string;
    shopId: string;
    role: 'BARISTA' | 'MANAGER' | 'CASHIER';
  }): Promise<Staff> {
    const existingStaff = await this.staffRepository.findByUserId(dto.userId);
    if (existingStaff) {
      throw new Error('User is already assigned as staff');
    }

    const staff = new Staff(
      require('uuid').v4(),
      dto.userId,
      dto.shopId,
      dto.role,
      new Date(),
      new Date(),
    );

    await this.staffRepository.save(staff);
    return staff;
  }
}

/* src/shopstaff/application/get-staff.usecase.ts */
