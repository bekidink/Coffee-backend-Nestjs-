import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './presentation/user.controller';
import { CreateUserUseCaseImpl } from './application/create-user.usecase';
import { LoginUseCaseImpl } from './application/login.usecase';
import { UpdateUserUseCaseImpl } from './application/update-user.usecase';
import { UserTypeOrmRepository } from './infrastructure/user-typeorm.repository';
import { UserTypeOrmEntity } from './infrastructure/user-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_user',
      entities: [UserTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'CreateUserUseCase',
      useClass: CreateUserUseCaseImpl,
    },
    {
      provide: 'LoginUseCase',
      useClass: LoginUseCaseImpl,
    },
    {
      provide: 'UpdateUserUseCase',
      useClass: UpdateUserUseCaseImpl,
    },
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class UserModule {}
