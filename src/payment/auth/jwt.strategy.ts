import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PaymentRepository } from '../domain/payment-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly paymentRepository: PaymentRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user has access to payments (e.g., customer, vendor, or admin)
    const payment = await this.paymentRepository.findById(payload.id);
    if (!payment && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No payments found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
