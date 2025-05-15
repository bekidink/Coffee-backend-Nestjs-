import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocationController } from './presentation/location.controller';
import { CreateLocationUseCaseImpl } from './application/create-location.usecase';
import { GetLocationUseCaseImpl } from './application/get-location.usecase';
import { FindNearbyLocationsUseCaseImpl } from './application/find-nearby-locations.usecase';
import { UpdateLocationUseCaseImpl } from './application/update-location.usecase';
import { LocationTypeOrmRepository } from './infrastructure/location-typeorm.repository';
import { LocationTypeOrmEntity } from './infrastructure/location-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_location',
      entities: [LocationTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [LocationController],
  providers: [
    {
      provide: 'CreateLocationUseCase',
      useClass: CreateLocationUseCaseImpl,
    },
    {
      provide: 'GetLocationUseCase',
      useClass: GetLocationUseCaseImpl,
    },
    {
      provide: 'FindNearbyLocationsUseCase',
      useClass: FindNearbyLocationsUseCaseImpl,
    },
    {
      provide: 'UpdateLocationUseCase',
      useClass: UpdateLocationUseCaseImpl,
    },
    {
      provide: 'LocationRepository',
      useClass: LocationTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class LocationModule {}
