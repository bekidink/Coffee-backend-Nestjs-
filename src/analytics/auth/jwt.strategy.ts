import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AnalyticsRepository } from '../domain/analytics-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has access to analytics
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only vendors or admins can access analytics',
      );
    }
    if (payload.role === 'VENDOR') {
      const shopPerformance = await this.analyticsRepository.getShopPerformance(
        payload.shopId,
        new Date(0),
        new Date(),
      );
      if (!shopPerformance.length) {
        throw new Error('Unauthorized: No analytics data found for this shop');
      }
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      shopId: payload.shopId,
    };
  }
}
