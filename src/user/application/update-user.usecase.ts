import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user-repository.interface';

export interface UpdateUserUseCase {
  execute(
    id: string,
    dto: {
      email?: string;
      password?: string;
      role?: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    },
  ): Promise<User>;
}
export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    dto: {
      email?: string;
      password?: string;
      role?: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    },
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (dto.email) {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already in use');
      }
      user.email = dto.email;
    }

    if (dto.password) {
      user.password = await import('bcrypt').then((bcrypt) =>
        bcrypt.hash(dto.password, 10),
      );
    }

    if (dto.role) {
      user.role = dto.role;
    }

    user.updatedAt = new Date();
    await this.userRepository.update(user);
    return user;
  }
}
