import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  postId: string;
}

export class UpdateCommentDto extends PartialType(
  PickType(CreateCommentDto, ['content'] as const),
) {}
