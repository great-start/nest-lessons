import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one user using ID' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  getOneById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create one user and save to DB' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update one user and save changes to DB' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: UpdateUserDto })
  @HttpCode(HttpStatus.OK)
  update(@Body() userDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(userDto, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Update one user and save changes to DB' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
