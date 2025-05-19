// src/presentation/modules/customer.module.ts
import { Module } from '@nestjs/common';
import { CustomerController } from '../controllers/customer.controller';
import { RegisterCustomerUseCase } from '../../application/use-cases/customer/register-customer.use-case';
import { LoginCustomerUseCase } from '../../application/use-cases/customer/login-customer.use-case';
import { UpdateCustomerUseCase } from '../../application/use-cases/customer/update-customer.use-case';
import { ListCustomersUseCase } from '../../application/use-cases/customer/list-customers.use-case';
import { DeleteCustomerUseCase } from '../../application/use-cases/customer/delete-customer.use-case';
import { PrismaCustomerRepository } from '../../infrastructure/repositories/prisma-customer.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CustomerController],
  providers: [
    RegisterCustomerUseCase,
    LoginCustomerUseCase,
    UpdateCustomerUseCase,
    ListCustomersUseCase,
    DeleteCustomerUseCase,
    PrismaService,
    JwtStrategy,
    {
      provide: 'ICustomerRepository',
      useClass: PrismaCustomerRepository,
    },
  ],
})
export class CustomerModule {}
