import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  UseInterceptors,
  Request,
  UploadedFile,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local.auth.guard';
import { User } from 'src/user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { diskStorage } from 'multer';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const extension = file.mimetype.split('/')[1];
          cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
        },
      }),
    }),
  )
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    this.uploadService.createUploadsFile();
    const user = await this.userService.create(createUserDto, file.filename);
    return { user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() request: Req): any {
    return { user: request.user };
  }

  @Get('logout')
  logOut(@Request() request: Req, @User() user: any) {
    request.session.destroy((error) => {});
    return { message: 'user session has ended' };
  }
}
