import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LanguageService } from '../../modules/language/language.service';

@Injectable()
export class LangGuard implements CanActivate {
  constructor(private languageService: LanguageService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const lang = req.headers['x-lang'] as string;

    if (!lang) {
      return true;
    }

    const allowedLanguages = await this.languageService.getLanguages();
    const allowedCodes = allowedLanguages.map((language) => language.code);

    if (!allowedCodes.includes(lang)) {
      throw new BadRequestException(`Language ${lang} is not supported.`);
    }

    return true;
  }
}
