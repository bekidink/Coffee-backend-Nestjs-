import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user-repository.interface';
import { UserTypeOrmEntity } from './user-typeorm.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    if (!entity) return null;
    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(user: User): Promise<void> {
    await this.repository.save({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async update(user: User): Promise<void> {
    await this.repository.update(user.id, {
      email: user.email,
      password: user.password,
      role: user.role,
      updatedAt: user.updatedAt,
    });
  }
}
