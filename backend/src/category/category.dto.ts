import { PartialType } from '@nestjs/mapped-types';
import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
