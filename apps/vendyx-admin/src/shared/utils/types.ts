export type THashMap<V = string | number> = Record<string | number, V>;

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type MakeAny<T> = {
  [K in keyof T]: any;
};

export type NullToUndefined<T> = T extends null
  ? undefined
  : T extends object
    ? { [K in keyof T]: NullToUndefined<T[K]> }
    : T;
