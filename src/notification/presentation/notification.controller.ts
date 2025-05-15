import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateNotificationUseCase } from '../application/create-notification.usecase';
import { GetNotificationUseCase } from '../application/get-notification.usecase';
import { UpdateNotificationUseCase } from '../application/update-notification.usecase';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly getNotificationUseCase: GetNotificationUseCase,
    private readonly updateNotificationUseCase: UpdateNotificationUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() dto: CreateNotificationDto) {
    const notification = await this.createNotificationUseCase.execute(dto);
    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const notification = await this.getNotificationUseCase.execute(id);
    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    const notification = await this.updateNotificationUseCase.execute(id, dto);
    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      isRead: notification.isRead,
    };
  }
}
