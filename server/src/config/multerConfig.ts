import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerConfig: MulterOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: diskStorage({
    destination: (req, file, next) => {
      const uploadDir = 'uploads/';

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      next(null, uploadDir);
    },
    filename(req, file, cb) {
      const uniqSuff = `${file.originalname.split('.')[0]}_${Date.now()}`;
      const ext = file.mimetype.split('/').pop();

      cb(null, `${uniqSuff}.${ext}`);
    },
  }),
  fileFilter(req, file, cb) {
    const fileTypes = /\.(png|jpg|jpeg|gif|svg|webp|ico|avif)$/i;

    if (fileTypes.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(
        new HttpException('Unsupported format.', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};
