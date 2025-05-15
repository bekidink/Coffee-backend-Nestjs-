import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LocationRepository } from '../domain/location-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly locationRepository: LocationRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has access to locations
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only vendors or admins can manage locations',
      );
    }
    if (payload.role === 'VENDOR') {
      const location = await this.locationRepository.findByShopId(
        payload.shopId,
      );
      if (!location && !payload.isCreating) {
        throw new Error('Unauthorized: No location found for this shop');
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
