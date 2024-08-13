import { PaymentMethodService } from '@/lib/shared/api';

export const getPaymentIntegrations = async () => {
  return await PaymentMethodService.getAllIntegrations();
};
