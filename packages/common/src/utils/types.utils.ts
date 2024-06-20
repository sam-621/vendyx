export type THashMap<V = string | number> = {
  [key: string | number]: V;
};

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type MakeAny<T> = {
  [K in keyof T]: any;
};
