import Configs from '@shared/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: false,
      expandVariables: true,
      envFilePath: [`etc/secrets/.env.${process.env.NODE_ENV}`],
    }),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
