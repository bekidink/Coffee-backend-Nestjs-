import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { NotificationRepository } from '../domain/notification-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly notificationRepository: NotificationRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user has access to notifications
    const notifications = await this.notificationRepository.findByUserId(
      payload.id,
    );
    if (!notifications.length && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No notifications found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
