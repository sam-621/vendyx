import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult, convertArgsToObject } from '../utils';

import {
  CreateShippingMethodInput,
  ShippingMethodErrorCode,
  UpdateShippingMethodInput
} from '@/app/api/common';
import { getConfig } from '@/app/config';
import { ID, ShippingMethodEntity, ZoneEntity } from '@/app/persistance';

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
  async find({ onlyEnabled = false }: { onlyEnabled?: boolean }) {
    return await this.db.getRepository(ShippingMethodEntity).find({
      where: { enabled: onlyEnabled || undefined },
      order: { createdAt: 'DESC' }
    });
  }

  getPricePreview(shippingMethod: ShippingMethodEntity) {
    const shippingPriceCalculator = getConfig().shipping.priceCalculators.find(
      p => p.code === shippingMethod.priceCalculator.code
    );

    // TODO: This is supposed to be always true, a shipping method should always have a price calculator.
    // But sometimes the shipping method is created and later in the code the price calculator is removed.
    // This is a temporary fix, we should refactor the code to avoid this situation.
    if (!shippingPriceCalculator) return;

    const pricePreview = shippingPriceCalculator.getPricePreview(
      convertArgsToObject(shippingMethod.priceCalculator.args)
    );

    return pricePreview;
  }

  /**
   * Create a new shipping method and assign it to the given zone.
   */
  async create(zoneId: ID, input: CreateShippingMethodInput) {
    const zone = await this.db.getRepository(ZoneEntity).findOne({ where: { id: zoneId } });

    if (!zone) {
      return new ErrorResult(ShippingMethodErrorCode.ZONE_NOT_FOUND, 'Zone not found');
    }

    const priceCalculatorExists = getConfig().shipping.priceCalculators.find(
      pc => pc.code === input.priceCalculator.code
    );

    if (!priceCalculatorExists) {
      return new ErrorResult(
        ShippingMethodErrorCode.SHIPPING_PRICE_CALCULATOR_NOT_FOUND,
        'Price calculator not found'
      );
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

    const priceCalculatorExists = getConfig().shipping.priceCalculators.find(
      pc => pc.code === input.priceCalculator?.code
    );

    if (!priceCalculatorExists && input.priceCalculator?.code) {
      return new ErrorResult(
        ShippingMethodErrorCode.SHIPPING_PRICE_CALCULATOR_NOT_FOUND,
        'Price calculator not found'
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
}
