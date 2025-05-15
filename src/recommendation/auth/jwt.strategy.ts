import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RecommendationRepository } from '../domain/recommendation-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a CUSTOMER or ADMIN and has access to recommendations
    if (payload.role !== 'CUSTOMER' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only customers or admins can access recommendations',
      );
    }
    const recommendations =
      await this.recommendationRepository.findRecommendationsByUserId(
        payload.id,
      );
    if (!recommendations.length && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No recommendations found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
