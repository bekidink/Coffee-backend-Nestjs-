import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StaffController } from './presentation/staff.controller';
import { CreateStaffUseCaseImpl } from './application/create-staff.usecase';
import { GetStaffUseCaseImpl } from './application/get-staff.usecase';
import { UpdateStaffUseCaseImpl } from './application/update-staff.usecase';
import { StaffTypeOrmRepository } from './infrastructure/staff-typeorm.repository';
import { StaffTypeOrmEntity } from './infrastructure/staff-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_staff',
      entities: [StaffTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [StaffController],
  providers: [
    {
      provide: 'CreateStaffUseCase',
      useClass: CreateStaffUseCaseImpl,
    },
    {
      provide: 'GetStaffUseCase',
      useClass: GetStaffUseCaseImpl,
    },
    {
      provide: 'UpdateStaffUseCase',
      useClass: UpdateStaffUseCaseImpl,
    },
    {
      provide: 'StaffRepository',
      useClass: StaffTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class ShopStaffModule {}
