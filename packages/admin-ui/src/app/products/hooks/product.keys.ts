export const ProductKeys = {
  all: ['products'],
  single: (id: string) => [...ProductKeys.all, id]
};
