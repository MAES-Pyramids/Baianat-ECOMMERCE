import { LanguageService } from './language.service';
import { Language } from '../../shared/types/graphql.schema';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLanguageInputDto } from './dtos/create-lang.input';
import { SetDefaultLanguageInputDto } from './dtos/set-default-lang.input';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private languageService: LanguageService) {}

  @Mutation(() => Language)
  createLanguage(@Args('data') data: CreateLanguageInputDto) {
    return this.languageService.createLanguage(data);
  }

  @Query(() => [Language])
  languages() {
    return this.languageService.getLanguages();
  }

  @Mutation(() => Language)
  setDefaultLanguage(@Args('data') data: SetDefaultLanguageInputDto) {
    return this.languageService.setDefaultLanguage(data);
  }

  @Query(() => Language)
  defaultLanguage() {
    return this.languageService.getDefaultLanguage();
  }
}
