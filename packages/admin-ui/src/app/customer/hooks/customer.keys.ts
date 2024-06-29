export const CustomersKeys = {
  all: ['all'],
  single: (id: string) => [...CustomersKeys.all, id]
};
