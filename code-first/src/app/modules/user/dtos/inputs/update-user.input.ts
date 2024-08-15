import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../../shared/enums/roles.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsEnum(Role)
  @Field({ nullable: true })
  role?: Role;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Field({ nullable: true })
  password?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isSuspended?: boolean;
}
