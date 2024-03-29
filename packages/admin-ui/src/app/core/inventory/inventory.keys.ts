export const InventoryKeys = {
  all: ['all'],
  single: (id: string) => [...InventoryKeys.all, id]
};
