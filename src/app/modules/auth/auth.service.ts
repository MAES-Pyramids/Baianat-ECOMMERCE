import * as _ from 'lodash';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { SignupInputDto } from './dtos/signup-input.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayload, User } from '../../shared/types/graphql.schema';
import { createAuthPayload } from '../../shared/utils/auth-payload.util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    const [storedHash, salt] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('invalid credentials');

    if (user && hash.toString('hex') === storedHash)
      return _.omit(user, 'password');
    else return null;
  }

  async signup(signupInput: SignupInputDto): Promise<User> {
    // Note: Email uniqueness is managed by the Prisma exception filter. Checking for email existence manually is unnecessary and avoids redundant database queries.
    return this.usersService.create(signupInput);
  }

  async login(user: User): Promise<AuthPayload> {
    const secret = process.env.JWT_SECRET;
    const jwtPayload = createAuthPayload(user);
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret,
      ...options,
    });

    return { accessToken, user };
  }
}
