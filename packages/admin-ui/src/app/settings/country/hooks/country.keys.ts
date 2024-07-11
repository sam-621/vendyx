export const CountryKeys = {
  all: ['countries'],
  single: (id: string) => [...CountryKeys.all, id]
};
