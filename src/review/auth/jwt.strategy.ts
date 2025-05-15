import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ReviewRepository } from '../domain/review-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly reviewRepository: ReviewRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a CUSTOMER or ADMIN and has access to reviews
    if (payload.role !== 'CUSTOMER' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only customers or admins can manage reviews',
      );
    }
    const review = await this.reviewRepository.findById(payload.id);
    if (!review && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No reviews found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
