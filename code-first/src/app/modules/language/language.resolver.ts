import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import { Language } from './models/language.model';
import { CreateLanguageInput } from './dtos/inputs/create-lang.input';
import { SetDefaultLanguageInput } from './dtos/inputs/set-default-lang.input';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';

@Resolver(() => Language)
@UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Query(() => [Language])
  @Roles('admin')
  async languages(): Promise<Language[]> {
    return this.languageService.getLanguages();
  }

  @Query(() => Language)
  @Roles('admin')
  async defaultLanguage(): Promise<Language> {
    return this.languageService.getDefaultLanguage();
  }

  @Mutation(() => Language)
  @Roles('admin')
  async createLanguage(
    @Args('data') data: CreateLanguageInput,
  ): Promise<Language> {
    return this.languageService.createLanguage(data);
  }

  @Mutation(() => Language)
  @Roles('admin')
  async setDefaultLanguage(
    @Args('data') data: SetDefaultLanguageInput,
  ): Promise<Language> {
    return this.languageService.setDefaultLanguage(data);
  }
}
