import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigRepository } from '../domain/config-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configRepository: ConfigRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has access to shop configurations
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only vendors or admins can manage shop configurations',
      );
    }
    if (payload.role === 'VENDOR') {
      const config = await this.configRepository.findByShopId(payload.shopId);
      if (!config && !payload.isCreating) {
        throw new Error('Unauthorized: No configuration found for this shop');
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
