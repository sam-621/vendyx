export type THashMap = Record<string | number, string | number>;

export type StringifyObject<T> = {
  [K in keyof T]: string;
};

export type MakeAny<T> = {
  [K in keyof T]: any;
};
