import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';

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
    UsersModule,
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
