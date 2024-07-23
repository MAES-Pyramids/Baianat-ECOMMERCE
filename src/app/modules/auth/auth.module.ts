import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './passport-strategies/local.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
