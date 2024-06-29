export const CustomersKeys = {
  all: ['customers'],
  single: (id: string) => [...CustomersKeys.all, id]
};
