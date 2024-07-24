import { join } from 'path';
import Configs from '@shared/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { OtpModule } from './app/modules/otp/otp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './app/modules/user/user.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MailerModule } from './app/modules/mailer/mailer.module';
import { DatabaseModule } from './app/modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: false,
      expandVariables: true,
      envFilePath: [`etc/secrets/.env.${process.env.NODE_ENV}`, 'prisma/.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: true,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/app/shared/types/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    MailerModule,
    UserModule,
    AuthModule,
    OtpModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
