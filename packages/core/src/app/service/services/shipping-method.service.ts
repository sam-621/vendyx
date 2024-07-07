import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { getConfig } from '@/app/config';
import { ID, OrderEntity, ShippingMethodEntity } from '@/app/persistance';

@Injectable()
export class ShippingMethodService {
  constructor(@InjectDataSource() private db: DataSource) {}

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
