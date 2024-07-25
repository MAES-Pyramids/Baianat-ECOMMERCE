import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LanguageService } from '../../modules/language/language.service';

@Injectable()
export class LangMiddleware implements NestMiddleware {
  constructor(private languageService: LanguageService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const lang = req.headers['x-lang'] as string;

    if (!lang) {
      const defaultLanguage = await this.languageService.getDefaultLanguage();
      req.headers['x-lang'] = defaultLanguage.code;
    } else {
      const allowedLanguages = await this.languageService.getLanguages();
      const allowedCodes = allowedLanguages.map((language) => language.code);

      if (!allowedCodes.includes(lang))
        throw new BadRequestException(`Language ${lang} is not supported.`);
    }

    req['lang'] = req.headers['x-lang'] as string;
    next();
  }
}
