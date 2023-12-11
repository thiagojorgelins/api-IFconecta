import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  private storage = multer.diskStorage({
    destination: './public/post/images/',
    filename: (req, file, cb) => {
      const random_num = Math.ceil(Math.random() * 10000)
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}_${random_num}${ext}`);
    },
  });

  private upload = multer({
    storage: this.storage, 
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        req['fileValidationError'] = 'Tipo de arquivo inválido. Permitido apenas JPEG e PNG.';
        cb(null, false);
      }
    }
  },);

  use(req: Request, res: Response, next: NextFunction) {
    this.upload.single('postImage')(req, res, (err: any) => {
      if (req['fileValidationError']) {
        return res.status(400).json({ message: req['fileValidationError'] });
      }
      next()
    });
  }
}