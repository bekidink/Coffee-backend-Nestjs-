import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NotificationController } from './presentation/notification.controller';
import { CreateNotificationUseCaseImpl } from './application/create-notification.usecase';
import { GetNotificationUseCaseImpl } from './application/get-notification.usecase';
import { UpdateNotificationUseCaseImpl } from './application/update-notification.usecase';
import { NotificationTypeOrmRepository } from './infrastructure/notification-typeorm.repository';
import { NotificationTypeOrmEntity } from './infrastructure/notification-typeorm.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationTypeOrmEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'coffee_shop_notification',
      entities: [NotificationTypeOrmEntity],
      synchronize: true, // Set to false in production
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [NotificationController],
  providers: [
    {
      provide: 'CreateNotificationUseCase',
      useClass: CreateNotificationUseCaseImpl,
    },
    {
      provide: 'GetNotificationUseCase',
      useClass: GetNotificationUseCaseImpl,
    },
    {
      provide: 'UpdateNotificationUseCase',
      useClass: UpdateNotificationUseCaseImpl,
    },
    {
      provide: 'NotificationRepository',
      useClass: NotificationTypeOrmRepository,
    },
    JwtStrategy,
  ],
})
export class NotificationModule {}
