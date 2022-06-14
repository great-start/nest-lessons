import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { constants } from '../constants/constants';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  fileValidate(file: Express.Multer.File) {
    if (file) {
      const { mimetype, size } = file;

      if (!constants.FILE_MIMETYPES.includes(mimetype)) {
        throw new HttpException('Wrong file format', HttpStatus.BAD_REQUEST);
      }

      if (size > constants.PHOTO_SIZE_MAX) {
        throw new HttpException('Too big file size', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async saveFile(file: Express.Multer.File) {
    if (file) {
      const fileName = uuidv4() + path.extname(file.originalname);
      const picturePath = path.resolve('photos/', fileName);

      fs.writeFile(picturePath, file.buffer, (err) => {
        if (err) {
          throw new HttpException('Troubles with saving file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
      return picturePath;
    }
  }
}
