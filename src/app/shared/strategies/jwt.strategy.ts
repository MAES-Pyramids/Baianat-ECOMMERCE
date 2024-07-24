import { GraphQLError } from 'graphql';
import { User } from '../types/graphql.schema';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../modules/user/user.service';
import { createAuthPayload } from '../utils/auth-payload.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PUBLIC,
      ignoreExpiration: false,
      logging: true,
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload || !payload.id) throw new UnauthorizedException();

    // Note: Since this authentication flow relies solely on a single access token (not both access and refresh tokens), and to ensure that the payload data is always up-to-date with the actual user data in the database,
    const user: User = await this.userService.findOne({ id: payload.id });

    // if (!user || user.isVerified === false) throw new UnauthorizedException();
    if (user.isSuspended) throw new GraphQLError('User is suspended');

    return createAuthPayload(user);
  }
}
