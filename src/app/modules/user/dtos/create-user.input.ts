import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
