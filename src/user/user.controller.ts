import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt.guards';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: '12313-4123-124-123-12',
          username: 'Vanya',
          email: 'asdasd@gmail.com',
          age: 55,
        },
      ],
    },
  })
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get one user using ID',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: '12313-4123-124-123-12',
        username: 'Vanya',
        email: 'asdasd@gmail.com',
        age: 55,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getOneById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update one user and save changes to DB',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiBody({ type: UpdateUserDto })
  @HttpCode(HttpStatus.OK)
  update(@Body() userDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(userDto, id);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one user',
  })
  @ApiResponse({
    status: 200,
  })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
