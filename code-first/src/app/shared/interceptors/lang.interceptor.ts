import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LanguageService } from '../../modules/language/language.service';

@Injectable()
export class LangInterceptor implements NestInterceptor {
  constructor(private readonly languageService: LanguageService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const lang = request.headers['x-lang'] as string;

    if (!lang) {
      const defaultLanguage = await this.languageService.getDefaultLanguage();
      request.headers['x-lang'] = defaultLanguage.code;
    } else {
      const allowedLanguages = await this.languageService.getLanguages();
      const allowedCodes = allowedLanguages.map((language) => language.code);

      if (!allowedCodes.includes(lang))
        throw new BadRequestException(`Language ${lang} is not supported.`);
    }

    request['lang'] = request.headers['x-lang'] as string;

    return next.handle();
  }
}
