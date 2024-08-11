import { Injectable } from '@nestjs/common';

import { CloudinaryService } from './providers';

@Injectable()
export class StorageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async upload(file: Express.Multer.File) {
    const result = await this.cloudinaryService.upload(file);

    return result?.secure_url;
  }
}
