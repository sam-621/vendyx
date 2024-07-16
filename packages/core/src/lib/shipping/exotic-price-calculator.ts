import { Args, ShippingPriceCalculatorConfig } from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class ExoticPriceCalculator implements ShippingPriceCalculatorConfig {
  name = 'Exotic price calculator';
  code = 'exotic-price-calculator';

  args: Args = {
    apiKey: {
      type: 'text',
      label: 'API Key',
      placeholder: 'Introduce your API key',
      conditions: { min: 0, max: 20 }
    },
    isActive: {
      type: 'boolean',
      label: 'Is enabled',
      defaultValue: true
    },
    canSend: {
      type: 'checkbox',
      label: 'Type'
    },
    type: {
      type: 'select',
      label: 'Type',
      defaultValue: '1',
      options: [
        { label: 'option 1', value: '1' },
        { label: 'option 2', value: '2' }
      ]
    },
    showPrice: {
      type: 'price',
      label: 'Show price',
      placeholder: '$ 0.00',
      conditions: { min: 0, max: 1000000 }
    },
    importance: {
      type: 'number',
      label: 'Importance',
      placeholder: '0',
      conditions: { min: 0, max: 12 }
    }
  };

  calculatePrice(_: OrderEntity, args: Record<string, string>): Promise<number> {
    console.log({
      args
    });

    return Promise.resolve(Math.random() * 100);
  }
}
