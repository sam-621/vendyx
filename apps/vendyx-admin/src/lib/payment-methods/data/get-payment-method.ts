import { PaymentMethodService } from '@/lib/shared/api';

export const getPaymentMethod = async (id: string) => {
  return await PaymentMethodService.getById(id);
};
