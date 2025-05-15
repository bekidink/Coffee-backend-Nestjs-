import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OrderRepository } from '../domain/order-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly orderRepository: OrderRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user has access to orders (e.g., customer, vendor, or admin)
    const orders = await this.orderRepository.findByUserId(payload.id);
    if (!orders.length && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No orders found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
