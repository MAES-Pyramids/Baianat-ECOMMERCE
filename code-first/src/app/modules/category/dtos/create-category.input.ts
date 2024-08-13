import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryInputDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number | null;
}
