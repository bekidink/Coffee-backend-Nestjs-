import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VendorController } from './presentation/vendor.controller';
import { CreateVendorUseCaseImpl } from './application/create-vendor.usecase';
import { GetVendorUseCaseImpl } from './application/get-vendor.usecase';
import { UpdateVendorUseCaseImpl } from './application/update-vendor.usecase';
import { VendorTypeOrmRepository } from './infrastructure/vendor-typeorm.repository';
import { VendorTypeOrmEntity } from './infrastructure/vendor-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_vendor',
      entities: [VendorTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [VendorController],
  providers: [
    {
      provide: 'CreateVendorUseCase',
      useClass: CreateVendorUseCaseImpl,
    },
    {
      provide: 'GetVendorUseCase',
      useClass: GetVendorUseCaseImpl,
    },
    {
      provide: 'UpdateVendorUseCase',
      useClass: UpdateVendorUseCaseImpl,
    },
    {
      provide: 'VendorRepository',
      useClass: VendorTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class VendorModule {}
