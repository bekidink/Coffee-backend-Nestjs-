import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../domain/notification.entity';
import { NotificationRepository } from '../domain/notification-repository.interface';
import { NotificationTypeOrmEntity } from './notification-typeorm.entity';

@Injectable()
export class NotificationTypeOrmRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationTypeOrmEntity)
    private readonly repository: Repository<NotificationTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Notification | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Notification(
      entity.id,
      entity.userId,
      entity.type,
      entity.message,
      entity.isRead,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map(
      (entity) =>
        new Notification(
          entity.id,
          entity.userId,
          entity.type,
          entity.message,
          entity.isRead,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async save(notification: Notification): Promise<void> {
    await this.repository.save({
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    });
  }

  async update(notification: Notification): Promise<void> {
    await this.repository.update(notification.id, {
      isRead: notification.isRead,
      updatedAt: notification.updatedAt,
    });
  }
}
