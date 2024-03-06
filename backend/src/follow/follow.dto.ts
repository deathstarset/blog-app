import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  followingId: string;
}
