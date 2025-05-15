import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoyaltyRepository } from '../domain/loyalty-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loyaltyRepository: LoyaltyRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a CUSTOMER or ADMIN and has access to loyalty account
    if (payload.role !== 'CUSTOMER' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only customers or admins can manage loyalty accounts',
      );
    }
    const loyalty = await this.loyaltyRepository.findByUserId(payload.id);
    if (!loyalty && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No loyalty account found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
