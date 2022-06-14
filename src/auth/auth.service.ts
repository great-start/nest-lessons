import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from './token.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { User } from '@prisma/client';
import { ITokenPair } from './interface/auth.token.interface';
import { FilesService } from '../files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private filesService: FilesService,
  ) {}

  async register(userToCreate: CreateUserDto, file: Express.Multer.File): Promise<Partial<ITokenPair>> {
    try {
      const userFromDB = await this.userService.getUserByEmail(userToCreate.email);

      if (userFromDB) {
        throw new HttpException('User has already exist', HttpStatus.BAD_REQUEST);
      }

      this.filesService.fileValidate(file);
      const filePath = await this.filesService.saveFile(file);

      const hashPass = await bcrypt.hash(userToCreate.password, 5);
      const savedUser = await this.userService.saveToDB({
        ...userToCreate,
        password: hashPass,
        photo: filePath,
      });

      const tokenPair = await this.tokenService.getTokenPair(savedUser);

      const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }

  async login(authUser: AuthUserDto) {
    const validatedUser = await this._validateUser(authUser);

    const tokenPair = await this.tokenService.getTokenPair(validatedUser);

    const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(tokenPair);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async _validateUser(user: AuthUserDto): Promise<User> {
    const userFromDB = await this.userService.getUserByEmail(user.email);

    if (!userFromDB) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    const comparedPass = await bcrypt.compare(user.password, userFromDB.password);

    if (!comparedPass) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
    return userFromDB;
  }

  // refresh tokenPair
  async refresh(userData: User): Promise<Partial<ITokenPair>> {
    await this.tokenService.deleteTokenPair(userData.id);

    const newTokenPair = await this.tokenService.getTokenPair(userData);

    const { accessToken, refreshToken } = await this.tokenService.saveTokenPair(newTokenPair);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userData: User) {
    await this.tokenService.deleteTokenPair(userData.id);
  }
}
