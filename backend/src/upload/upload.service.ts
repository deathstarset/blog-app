import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class UploadService {
  createUploadsFile() {
    const dir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          throw new InternalServerErrorException(
            'Failed to create uploads folder',
          );
        }
      });
    }
  }
}
