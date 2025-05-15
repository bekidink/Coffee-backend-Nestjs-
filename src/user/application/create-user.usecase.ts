import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user-repository.interface';

export interface CreateUserUseCase {
  execute(dto: {
    email: string;
    password: string;
    role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  }): Promise<User>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: {
    email: string;
    password: string;
    role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await import('bcrypt').then((bcrypt) =>
      bcrypt.hash(dto.password, 10),
    );
    const user = new User(
      require('uuid').v4(),
      dto.email,
      hashedPassword,
      dto.role,
      new Date(),
      new Date(),
    );

    await this.userRepository.save(user);
    return user;
  }
}
