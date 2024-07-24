import {
  IsInt,
  IsArray,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

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
}
