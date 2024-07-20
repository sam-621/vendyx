import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class PaypalService {
  constructor(@Inject('STRIPE_PLUGIN_OPTIONS') private options: any) {}

  async createPaypalOrder() {
    console.log({
      options: this.options
    });
  }
}
