import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateArticleDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Body must be a string' })
  body?: string;
}

export class UpdateArticleInputDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  article?: UpdateArticleDto;
}
