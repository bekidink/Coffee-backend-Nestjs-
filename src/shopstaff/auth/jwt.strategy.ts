import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StaffRepository } from '../domain/staff-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly staffRepository: StaffRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has access to staff management
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: Only vendors or admins can manage staff');
    }
    if (payload.role === 'VENDOR') {
      const staff = await this.staffRepository.findByShopId(payload.shopId);
      if (!staff.length && !payload.isCreating) {
        throw new Error('Unauthorized: No staff found for this shop');
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
