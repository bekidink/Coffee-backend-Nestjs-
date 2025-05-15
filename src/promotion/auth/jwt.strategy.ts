import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PromotionRepository } from '../domain/promotion-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly promotionRepository: PromotionRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has access to promotions
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only vendors or admins can manage promotions',
      );
    }
    const promotions = await this.promotionRepository.findByShopId(
      payload.shopId || '',
    );
    if (!promotions.length && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No promotions found for this shop');
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      shopId: payload.shopId,
    };
  }
}
