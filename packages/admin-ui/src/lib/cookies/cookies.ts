import Cookies from 'js-cookie';

export const cookies = {
  set: (name: string, value: any, options?: SetCookieOptions) => {
    const valueToSave = typeof value === 'object' ? JSON.stringify(value) : String(value);

    Cookies.set(name, valueToSave, options);
  },
  get: (name: string) => {
    return Cookies.get(name);
  },
  remove: (name: string) => {
    Cookies.remove(name);
  }
};

type SetCookieOptions = typeof Cookies.attributes;
