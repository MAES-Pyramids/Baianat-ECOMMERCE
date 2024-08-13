import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LanguageContextProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getLanguage(): string {
    return this.request['req'].lang as string;
  }
}
