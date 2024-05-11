import { ShippingPriceCalculatorConfig } from '@/app/config';

export class FedexPriceCalculator implements ShippingPriceCalculatorConfig {
  name = 'Fedex calculator';
  code = 'fedex-calculator';

  calculatePrice(): Promise<number> {
    return Promise.resolve(10000);
  }
}
