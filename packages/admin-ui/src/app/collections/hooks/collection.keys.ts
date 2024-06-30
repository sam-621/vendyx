export const CollectionKeys = {
  all: ['collections'],
  single: (id: string) => [...CollectionKeys.all, id]
};
