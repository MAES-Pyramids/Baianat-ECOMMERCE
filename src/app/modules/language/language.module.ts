import { Global, Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageResolver } from './language.resolver';

@Global()
@Module({
  providers: [LanguageService, LanguageResolver],
  exports: [LanguageService],
})
export class LanguageModule {}
