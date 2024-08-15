import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  firstName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lastName?: string | null;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @Field()
  password: string;
}
