import Configs from '@shared/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './app/modules/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './app/modules/users/users.module';
import { AuthModule } from './app/modules/auth/auth.module';

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
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
