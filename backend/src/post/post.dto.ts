import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  categories: string[];
}

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['categories'] as const),
) {}
