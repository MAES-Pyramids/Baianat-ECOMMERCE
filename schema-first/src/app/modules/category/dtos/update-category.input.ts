import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryInputDto {
  @IsString()
  name: string;

  @IsOptional()
  parentId: number | null;
}
