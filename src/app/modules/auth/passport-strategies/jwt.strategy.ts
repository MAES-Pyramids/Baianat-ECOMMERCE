import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PUBLIC,
      ignoreExpiration: false,
      logging: true,
    });
  }

  async validate(payload: any) {
    if (!payload) throw new UnauthorizedException();
    else return payload;
  }
}
