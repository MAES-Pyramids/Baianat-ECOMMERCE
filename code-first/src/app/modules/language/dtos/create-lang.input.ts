import { IsString } from 'class-validator';

export class CreateLanguageInputDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
