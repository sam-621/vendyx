import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ID, ShipmentEntity } from '@/app/persistance';

@Injectable()
export class ShipmentService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async findMethod(id: ID) {
    const shipment = await this.db.getRepository(ShipmentEntity).findOne({
      where: { id },
      relations: { method: true }
    });

    return shipment?.method;
  }
}
