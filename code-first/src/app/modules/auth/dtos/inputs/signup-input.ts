import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SignupInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lastName: string;
}
