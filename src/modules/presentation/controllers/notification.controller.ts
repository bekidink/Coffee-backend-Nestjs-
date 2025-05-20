// src/presentation/controllers/notification.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SendNotificationUseCase } from '../../application/use-cases/notification/send-notification.use-case';
import { SendBroadcastNotificationUseCase } from '../../application/use-cases/notification/send-broadcast-notification.use-case';
import { ListNotificationsUseCase } from '../../application/use-cases/notification/list-notifications.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/notification/mark-notification-as-read.use-case';
import {
  SendNotificationDto,
  SendBroadcastNotificationDto,
} from '../../application/dtos/notification.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private sendBroadcastNotificationUseCase: SendBroadcastNotificationUseCase,
    private listNotificationsUseCase: ListNotificationsUseCase,
    private markNotificationAsReadUseCase: MarkNotificationAsReadUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async send(@Body() dto: SendNotificationDto) {
    return this.sendNotificationUseCase.execute(dto);
  }

  @Post('broadcast')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async broadcast(@Body() dto: SendBroadcastNotificationDto) {
    return this.sendBroadcastNotificationUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async list(
    @Query('userId') userId: string,
    @Query('userType') userType: 'CUSTOMER' | 'VENDOR' | 'ADMIN',
    @Query('unreadOnly') unreadOnly: string,
  ) {
    return this.listNotificationsUseCase.execute(
      userId,
      userType,
      unreadOnly === 'true',
    );
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER', 'VENDOR', 'ADMIN')
  async markAsRead(@Param('id') id: string) {
    return this.markNotificationAsReadUseCase.execute(id);
  }
}
