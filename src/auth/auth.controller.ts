import { Controller, Post, Body, Req, HttpStatus, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IRequestExtended } from './interface/extented.requets.interface';
import { MulterFilesOptions } from '../utils/multer.files.options';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user using data',
    description: 'registration',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        accessToken: 'asd234vdce5te5b123vqfve5tb5t',
        refreshToken: 'asd234vdce5te5b123vqfve5tb5t',
      },
    },
  })
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  @UseInterceptors(FileInterceptor('file', MulterFilesOptions))
  registration(@Body() createUser: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.register(createUser, file.path);
  }

  @ApiOperation({
    summary: 'Login user using email and password',
    description: 'login',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        accessToken: 'asd234vdce5te5b123vqfve5tb5t',
        refreshToken: 'asd234vdce5te5b123vqfve5tb5t',
      },
    },
  })
  @ApiBody({ type: AuthUserDto })
  @Post('/login')
  login(@Body() authUser: AuthUserDto) {
    return this.authService.login(authUser);
  }

  @ApiOperation({
    summary: 'Update tokens using valid refreshToken',
    description: 'refresh',
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        accessToken: 'asd234vdce5te5b123vqfve5tb5t',
        refreshToken: 'asd234vdce5te5b123vqfve5tb5t',
      },
    },
  })
  @Post('/refresh')
  refresh(@Req() req: IRequestExtended) {
    return this.authService.refresh(req.userData);
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'Logout',
  })
  @ApiOkResponse({
    status: 200,
  })
  @Post('/logout')
  async logout(@Req() req: IRequestExtended, @Res() res: Response) {
    await this.authService.logout(req.userData);
    res.status(HttpStatus.OK).json({ message: 'You are logged out' });
  }
}
