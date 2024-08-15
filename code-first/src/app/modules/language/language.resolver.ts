import { UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from './models/language.model';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLanguageInput } from './dtos/inputs/create-lang.input';
import { SetDefaultLanguageInput } from './dtos/inputs/set-default-lang.input';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';

@Resolver(() => Language)
@UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
export class LanguageResolver {
  constructor(private languageService: LanguageService) {}

  @Query(() => [Language])
  @Roles('admin')
  languages() {
    return this.languageService.getLanguages();
  }

  @Query(() => Language)
  @Roles('admin')
  defaultLanguage() {
    return this.languageService.getDefaultLanguage();
  }

  @Mutation(() => Language)
  @Roles('admin')
  createLanguage(@Args('data') data: CreateLanguageInput) {
    return this.languageService.createLanguage(data);
  }

  @Mutation(() => Language)
  @Roles('admin')
  setDefaultLanguage(@Args('data') data: SetDefaultLanguageInput) {
    return this.languageService.setDefaultLanguage(data);
  }
}
