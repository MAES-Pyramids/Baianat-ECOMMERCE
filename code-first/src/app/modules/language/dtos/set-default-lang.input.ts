import { IsString } from 'class-validator';

export class SetDefaultLanguageInputDto {
  @IsString()
  code: string;
}
