import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreateShippingMethodInput,
  ShippingMethodErrorCode,
  UpdateShippingMethodInput
} from '@/app/api/common';
import { getConfig } from '@/app/config';
import { ID, OrderEntity, ShippingMethodEntity, ZoneEntity } from '@/app/persistance';

@Injectable()
export class ShippingMethodService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find unique shipping method by id.
   */
  async findUnique(id: ID) {
    return await this.db.getRepository(ShippingMethodEntity).findOne({ where: { id } });
  }

  /**
   * Find all shipping methods.
   */
  private async find({ onlyEnabled = false }: { onlyEnabled?: boolean }) {
    return await this.db.getRepository(ShippingMethodEntity).find({
      where: { enabled: onlyEnabled || undefined }
    });
  }

  /**
   * Find available shipping methods for the given order.
   */
  async findAvailable(orderId: ID) {
    const order = await this.db.getRepository(OrderEntity).findOne({ where: { id: orderId } });

    const methods = await this.find({ onlyEnabled: true });

    if (!order) {
      return methods.map(method => ({ ...method, price: 0 }));
    }

    return await this.getMethodsWithPrice(order, methods);
  }

  /**
   * Create a new shipping method and assign it to the given zone.
   */
  async create(zoneId: ID, input: CreateShippingMethodInput) {
    const zone = await this.db.getRepository(ZoneEntity).findOne({ where: { id: zoneId } });

    if (!zone) {
      return new ErrorResult(ShippingMethodErrorCode.ZONE_NOT_FOUND, 'Zone not found');
    }

    return await this.db.getRepository(ShippingMethodEntity).save({
      ...clean(input),
      zone
    });
  }

  /**
   * Update a shipping method.
   */
  async update(id: ID, input: UpdateShippingMethodInput) {
    const method = await this.findUnique(id);

    if (!method) {
      return new ErrorResult(
        ShippingMethodErrorCode.SHIPPING_METHOD_NOT_FOUND,
        'Shipping method not found'
      );
    }

    return await this.db.getRepository(ShippingMethodEntity).save({ ...method, ...clean(input) });
  }

  /**
   * Remove a shipping method.
   */
  async remove(id: ID) {
    const method = await this.findUnique(id);

    if (!method) {
      return new ErrorResult(
        ShippingMethodErrorCode.SHIPPING_METHOD_NOT_FOUND,
        'Shipping method not found'
      );
    }

    await this.db.getRepository(ShippingMethodEntity).remove(method);

    return true;
  }

  /**
   * Get shipping methods with calculated price depending on the given order.
   */
  private async getMethodsWithPrice(order: OrderEntity, methods: ShippingMethodEntity[]) {
    const methodsWithPrice: (ShippingMethodEntity & { price: number })[] = [];

    for (const method of methods) {
      const shippingPriceCalculator = getConfig().shipping.priceCalculators.find(
        p => p.code === method.priceCalculatorCode
      );

      const price = await shippingPriceCalculator?.calculatePrice(order);

      methodsWithPrice.push({ ...method, price: price ?? 0 });
    }

    return methodsWithPrice;
  }
}
