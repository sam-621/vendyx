export const OrderKeys = {
  all: ['orders'],
  single: (id: string) => [...OrderKeys.all, id]
};
