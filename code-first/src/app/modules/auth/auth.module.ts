import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { LocalStrategy } from '../../shared/strategies/local.strategy';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        const options: JwtModuleOptions = {
          signOptions: {
            algorithm: 'RS256',
          },
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
        return options;
      },
    }),
    PassportModule,
    UserModule,
    OtpModule,
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
