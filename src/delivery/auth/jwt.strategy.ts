import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DeliveryRepository } from '../domain/delivery-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly deliveryRepository: DeliveryRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR, DELIVERY_AGENT, or ADMIN and has access to deliveries
    if (
      payload.role !== 'VENDOR' &&
      payload.role !== 'DELIVERY_AGENT' &&
      payload.role !== 'ADMIN'
    ) {
      throw new Error(
        'Unauthorized: Only vendors, delivery agents, or admins can manage deliveries',
      );
    }
    const deliveries = await this.deliveryRepository.findByShopId(
      payload.shopId || '',
    );
    if (
      !deliveries.length &&
      payload.role !== 'ADMIN' &&
      payload.role !== 'DELIVERY_AGENT'
    ) {
      throw new Error('Unauthorized: No deliveries found for this shop');
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      shopId: payload.shopId,
    };
  }
}
