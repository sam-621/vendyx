import { Args, ShippingPriceCalculatorConfig } from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class FlatPriceCalculator implements ShippingPriceCalculatorConfig {
  name = 'Flat price calculator';
  code = 'flat-price-calculator';

  args: Args = {
    price: {
      type: 'price',
      required: true,
      label: 'Price',
      placeholder: '$ 0.00',
      conditions: { min: 0, max: 1000000 }
    }
  };

  calculatePrice(_: OrderEntity, args: Record<string, string>): Promise<number> {
    return Promise.resolve(parseFloat(args.price));
  }

  getPricePreview(args: Record<string, string>): number {
    return parseFloat(args.price);
  }
}
