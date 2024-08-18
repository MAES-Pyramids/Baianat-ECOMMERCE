import { join } from 'path';
import Configs from '@shared/config';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { Module, OnModuleInit } from '@nestjs/common';
import { OtpModule } from './app/modules/otp/otp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './app/modules/user/user.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JsonScalar } from './app/graphql/scalars/json.scalar';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MailerModule } from './app/modules/mailer/mailer.module';
import { ProductModule } from './app/modules/product/product.module';
import { CategoryModule } from './app/modules/category/category.module';
import { DatabaseModule } from './app/modules/database/database.module';
import { LanguageModule } from './app/modules/language/language.module';
import { LanguageService } from './app/modules/language/language.service';
import { DataloaderModule } from './app/modules/dataloader/dataloader.module';
import { DataloaderService } from './app/modules/dataloader/dataloader.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const depthLimit = require('graphql-depth-limit');

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
    EventEmitterModule.forRoot(),
    DatabaseModule,
    MailerModule,
    UserModule,
    AuthModule,
    OtpModule,
    ProductModule,
    DataloaderModule,
    CategoryModule,
    LanguageModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      driver: ApolloDriver,
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'src/app/graphql/schema/schema.gql',
          ),
          context: () => ({ loaders: dataloaderService.getLoaders() }),
          resolvers: { JSON: new JsonScalar() },
          debug: true,
          validationRules: [depthLimit(6)],
        };
      },
      inject: [DataloaderService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly languageService: LanguageService) {}

  async onModuleInit() {
    const languages = await this.languageService.getLanguages();
    if (languages.length === 0) {
      await this.languageService.createLanguage({
        code: 'en',
        name: 'English',
      });
      await this.languageService.setDefaultLanguage({ code: 'en' });
    }
  }
}
