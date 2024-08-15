import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt } from 'crypto';
import { OtpService } from '../otp/otp.service';
import { UserService } from '../user/user.service';
import { OtpTypes } from '../../shared/enums/otps.enum';
import { SignupInput } from './dtos/inputs/signup-input';
// import {
//   User,
//   AuthPayload,
//   PassResetResponse,
// } from '../../shared/types/graphql.schema';
import { createAuthPayload } from '../../shared/utils/auth-payload.util';
import { PassResetResponse } from './dtos/responses/pass-reset.response';
import { User } from '../user/models/user.model';
import { AuthPayload } from './dtos/responses/auth.response';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    const [storedHash, salt] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('invalid credentials');

    if (user && hash.toString('hex') === storedHash)
      return _.omit(user, 'password');
    else return null;
  }

  async signup(signupInput: SignupInput): Promise<User> {
    // Note: Email uniqueness is managed by the Prisma exception filter. Checking for email existence manually is unnecessary and avoids redundant database queries.
    const user = await this.userService.create(signupInput);

    await this.otpService.createAndSendOtp(
      user.id,
      user.email,
      OtpTypes.VERIFY_ACCOUNT,
    );

    return user;
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

  async generateResetPassJWT(
    email: string,
    otp: string,
  ): Promise<PassResetResponse> {
    const user = await this.userService.findOne({ email });
    if (!user) throw new HttpException('email not found', HttpStatus.NOT_FOUND);

    const valid = await this.otpService.verifyOtp(
      user.id,
      otp,
      OtpTypes.RESET_PASSWORD,
    );
    if (!valid) throw new BadRequestException('Invalid OTP');

    const secret = process.env.JWT_PASS_SECRET;
    const options = { expiresIn: process.env.JWT_PASS_RESET_IN };
    const passwordResetToken = this.jwtService.sign(
      { id: user.id },
      { secret, ...options },
    );
    return { success: true, passwordResetToken };
  }

  async setPassword(
    passwordResetToken: string,
    password: string,
  ): Promise<User> {
    const publicKey = process.env.JWT_PASS_PUBLIC;

    const decodedToken = this.decodeToken(passwordResetToken, publicKey);
    if (!decodedToken.id) throw new BadRequestException('Invalid token');

    const user = await this.userService.findOne({ id: decodedToken.id });
    if (!user) throw new NotFoundException('User not found');

    return await this.userService.update(user.id, { password });
  }

  private decodeToken(token: string, publicKey: string): any {
    try {
      return this.jwtService.verify(token, { publicKey });
    } catch (e) {
      throw e.name === 'TokenExpiredError'
        ? new BadRequestException('Token expired')
        : new BadRequestException('Invalid token');
    }
  }
}
