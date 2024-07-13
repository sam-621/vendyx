export const ShipmentKeys = {
  all: ['zones'],
  single: (id: string) => [...ShipmentKeys.all, id]
};
