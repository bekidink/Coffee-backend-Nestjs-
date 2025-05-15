import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user-repository.interface';

export interface LoginUseCase {
  execute(dto: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }>;
}

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: any, // Simplified for example; use @nestjs/jwt in practice
  ) {}

  async execute(dto: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await import('bcrypt').then((bcrypt) =>
      bcrypt.compare(dto.password, user.password),
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { user, token };
  }
}
