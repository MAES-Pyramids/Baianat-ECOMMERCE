import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLanguageInput } from './dtos/inputs/create-lang.input';
import { SetDefaultLanguageInput } from './dtos/inputs/set-default-lang.input';

@Injectable()
export class LanguageService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createLanguage(data: CreateLanguageInput) {
    return this.prismaService.language.create({
      data: { ...data, isDefault: false },
    });
  }

  async getLanguages() {
    return this.prismaService.language.findMany();
  }

  async setDefaultLanguage(data: SetDefaultLanguageInput) {
    await this.prismaService.language.updateMany({
      where: { isDefault: true },
      data: { isDefault: false },
    });

    return this.prismaService.language.update({
      where: { code: data.code },
      data: { isDefault: true },
    });
  }

  async getDefaultLanguage() {
    return await this.prismaService.language.findFirst({
      where: { isDefault: true },
    });
  }
}
