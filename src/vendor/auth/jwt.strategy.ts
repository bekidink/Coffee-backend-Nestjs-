import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VendorRepository } from '../domain/vendor-repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly vendorRepository: VendorRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Replace with env variable in production
    });
  }

  async validate(payload: any) {
    // Validate user is a VENDOR or ADMIN and has a vendor profile
    if (payload.role !== 'VENDOR' && payload.role !== 'ADMIN') {
      throw new Error(
        'Unauthorized: Only vendors or admins can manage vendor profiles',
      );
    }
    const vendor = await this.vendorRepository.findByUserId(payload.id);
    if (!vendor && payload.role !== 'ADMIN') {
      throw new Error('Unauthorized: No vendor profile found for this user');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
