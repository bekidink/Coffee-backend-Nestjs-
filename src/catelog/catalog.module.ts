import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MenuItemController } from './presentation/menu-item.controller';
import { CreateMenuItemUseCaseImpl } from './application/create-menu-item.usecase';
import { GetMenuItemUseCaseImpl } from './application/get-menu-item.usecase';
import { UpdateMenuItemUseCaseImpl } from './application/update-menu-item.usecase';
import { MenuItemTypeOrmRepository } from './infrastructure/menu-item-typeorm.repository';
import { MenuItemTypeOrmEntity } from './infrastructure/menu-item-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItemTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_catalog',
      entities: [MenuItemTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [MenuItemController],
  providers: [
    {
      provide: 'CreateMenuItemUseCase',
      useClass: CreateMenuItemUseCaseImpl,
    },
    {
      provide: 'GetMenuItemUseCase',
      useClass: GetMenuItemUseCaseImpl,
    },
    {
      provide: 'UpdateMenuItemUseCase',
      useClass: UpdateMenuItemUseCaseImpl,
    },
    {
      provide: 'MenuItemRepository',
      useClass: MenuItemTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class CatalogModule {}
