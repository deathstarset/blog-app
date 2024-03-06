import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from 'src/entities/user.entity';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  role?: UserRole;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  adminId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
