import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string | null;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
