import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { InventoryController } from './presentation/inventory.controller';
import { CreateInventoryUseCaseImpl } from './application/create-inventory.usecase';
import { GetInventoryUseCaseImpl } from './application/get-inventory.usecase';
import { UpdateInventoryUseCaseImpl } from './application/update-inventory.usecase';
import { InventoryTypeOrmRepository } from './infrastructure/inventory-typeorm.repository';
import { InventoryTypeOrmEntity } from './infrastructure/inventory-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_inventory',
      entities: [InventoryTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [InventoryController],
  providers: [
    {
      provide: 'CreateInventoryUseCase',
      useClass: CreateInventoryUseCaseImpl,
    },
    {
      provide: 'GetInventoryUseCase',
      useClass: GetInventoryUseCaseImpl,
    },
    {
      provide: 'UpdateInventoryUseCase',
      useClass: UpdateInventoryUseCaseImpl,
    },
    {
      provide: 'InventoryRepository',
      useClass: InventoryTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class InventoryModule {}
