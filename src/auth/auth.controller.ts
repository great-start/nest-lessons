import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
