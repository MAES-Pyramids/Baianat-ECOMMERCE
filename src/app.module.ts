import { join } from 'path';
import Configs from '@shared/config';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { OtpModule } from './app/modules/otp/otp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './app/modules/user/user.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { JsonScalar } from './app/graphql/scalars/json.scalar';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MailerModule } from './app/modules/mailer/mailer.module';
import { ProductModule } from './app/modules/product/product.module';
import { CategoryModule } from './app/modules/category/category.module';
import { DatabaseModule } from './app/modules/database/database.module';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { LanguageModule } from './app/modules/language/language.module';
import { LanguageService } from './app/modules/language/language.service';
import { APP_GUARD } from '@nestjs/core';
import { LangGuard } from './app/shared/guards/lang.guard';

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
      resolvers: { JSON: new JsonScalar() },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join('dist', 'apps', 'api', 'i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang']),
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    MailerModule,
    UserModule,
    AuthModule,
    OtpModule,
    ProductModule,
    CategoryModule,
    LanguageModule,
  ],
  providers: [
    LanguageService,
    {
      provide: APP_GUARD,
      useClass: LangGuard,
    },
  ],
  controllers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private languageService: LanguageService) {}

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
