import { diskStorage } from 'multer';
import { Express } from 'express';
import { constants } from '../constants/constants';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export const MulterOptions = {
  storage: diskStorage({
    destination: './photos',
    filename: (req, file: Express.Multer.File, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}`);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const { mimetype, size } = file;

    if (!constants.FILE_MIMETYPES.includes(mimetype)) {
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }

    if (size > constants.PHOTO_SIZE_MAX) {
      cb(new HttpException(`Too big file size`, HttpStatus.BAD_REQUEST), false);
    }

    cb(null, true);

    // if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    //   cb(null, true);
    // } else {
    //   cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    // }
  },
};
