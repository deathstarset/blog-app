import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsAlpha,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateIf,
  IsDefined,
} from 'class-validator';
import { LikeType } from 'src/entities/like.entity';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsBoolean()
  isLike: boolean;

  @IsNotEmpty()
  @IsAlpha()
  @IsEnum(LikeType)
  type: 'comment' | 'post';

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  commentId?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  postId?: string;

  @ValidateIf((o) => !o.commentId && !o.postId)
  @IsDefined({
    message: 'At least one of postId or commentId must be provided',
  })
  protected readonly checkAtLeastOne: undefined;

  @ValidateIf((o) => o.commentId && o.postId)
  @IsDefined({
    message: 'At least one of postId or commentId must be provided',
  })
  protected readonly checkOnlyOne: undefined;
}

export class UpdateLikeDto extends PartialType(
  PickType(CreateLikeDto, ['isLike'] as const),
) {}
