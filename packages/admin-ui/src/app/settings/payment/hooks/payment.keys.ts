export const PaymentKeys = {
  all: ['all'],
  single: (id: string) => [...PaymentKeys.all, id]
};
