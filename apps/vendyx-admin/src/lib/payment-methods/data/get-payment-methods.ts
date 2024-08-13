import { PaymentMethodService } from '@/lib/shared/api';

export const getPaymentMethods = async () => {
  return await PaymentMethodService.getAll();
};
