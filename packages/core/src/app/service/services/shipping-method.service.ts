import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ShippingMethodEntity } from '@/app/persistance';

@Injectable()
export class ShippingMethodService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async find() {
    return await this.db.getRepository(ShippingMethodEntity).find();
  }
}
