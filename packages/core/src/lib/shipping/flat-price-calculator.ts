import { ShippingPriceCalculatorConfig } from '@/app/config';

export class FlatPriceCalculator implements ShippingPriceCalculatorConfig {
  name = 'Flat price calculator';
  code = 'flat-price-calculator';

  calculatePrice(): Promise<number> {
    return Promise.resolve(5000);
  }
}
