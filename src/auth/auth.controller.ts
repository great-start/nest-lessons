import { Controller, Post, Body, Req, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IRequestExtended } from './interface/extented.requets.interface';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user using data',
    description: 'registration',
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
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  registration(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser);
  }

  @ApiOperation({
    summary: 'Login user using email and password',
    description: 'login',
  })
  @ApiResponse({ status: 200 })
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
  @Post('/logout')
  async logout(@Req() req: IRequestExtended, @Res() res: Response) {
    await this.authService.logout(req.userData);
    res.status(HttpStatus.OK).json({ message: 'You are logged out' });
  }
}
