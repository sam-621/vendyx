import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ID, PaymentEntity } from '@/app/persistance';

@Injectable()
export class PaymentService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async findMethod(id: ID) {
    const payment = await this.db.getRepository(PaymentEntity).findOne({
      where: { id },
      relations: { method: true },
    });

    return payment.method;
  }
}
