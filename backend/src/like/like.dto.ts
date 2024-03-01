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

export class createLikeDto {
  @IsBoolean()
  isLike: boolean;

  @IsEnum(LikeType)
  @IsNotEmpty()
  @IsAlpha()
  type: LikeType;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  commentId?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
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
  PickType(createLikeDto, ['isLike'] as const),
) {}
