import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigController } from './presentation/config.controller';
import { CreateConfigUseCaseImpl } from './application/create-config.usecase';
import { GetConfigUseCaseImpl } from './application/get-config.usecase';
import { UpdateConfigUseCaseImpl } from './application/update-config.usecase';
import { ConfigTypeOrmRepository } from './infrastructure/config-typeorm.repository';
import { ConfigTypeOrmEntity } from './infrastructure/config-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_config',
      entities: [ConfigTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ConfigController],
  providers: [
    {
      provide: 'CreateConfigUseCase',
      useClass: CreateConfigUseCaseImpl,
    },
    {
      provide: 'GetConfigUseCase',
      useClass: GetConfigUseCaseImpl,
    },
    {
      provide: 'UpdateConfigUseCase',
      useClass: UpdateConfigUseCaseImpl,
    },
    {
      provide: 'ConfigRepository',
      useClass: ConfigTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class ShopConfigModule {}
