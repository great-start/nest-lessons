import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  update(@Body() userDto: CreateUserDto) {
    this.userService.update(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
