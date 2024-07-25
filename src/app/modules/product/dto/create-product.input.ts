import {
  IsInt,
  IsArray,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductInputDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsObject()
  specifications?: any;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationInputDto)
  translations: CreateTranslationInputDto[];
}

export class CreateTranslationInputDto {
  @IsString()
  @IsEnum(['ar', 'fr'], { message: 'we support only ar or fr translations' })
  locale: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
