import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['userId'] as const),
) {}
