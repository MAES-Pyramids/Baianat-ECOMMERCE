import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthPayload, User } from '../../shared/types/graphql.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) return _.omit(user, 'password');
    else return null;
  }

  async login(user: User): Promise<AuthPayload> {
    const secret = process.env.JWT_SECRET;
    const jwtPayload = { email: user.email, role: user.role, sub: user.id };
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret,
      ...options,
    });

    return { accessToken, user };
  }
}
