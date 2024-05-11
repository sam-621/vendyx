import { ShippingPriceCalculatorConfig } from '@/app/config';

export class CountryPriceCalculator implements ShippingPriceCalculatorConfig {
  name = 'Country shipping calculator';
  code = 'country-shipping-calculator';

  calculatePrice(): Promise<number> {
    return Promise.resolve(5000);
  }
}
