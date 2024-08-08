export const getParamName = (type: 'page' | 'size' | 'search', queryParamPrefix?: string) => {
  if (!queryParamPrefix) return type;

  return `${queryParamPrefix}_${type}`;
};

export type DataTableSearchParams = {
  page?: string;
  size?: string;
  search?: string;
};
