import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private storage = multer.diskStorage({
    destination: './public/post/images/',
    filename: (req, file, cb) => {
      const random_num = Math.ceil(Math.random() * 10000)
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}_${random_num}${ext}`);
    },
  });

  private upload = multer({ storage: this.storage });

  use(req: Request, res: Response, next: NextFunction) {
    this.upload.single('postImage')(req, res, next);
  }
}