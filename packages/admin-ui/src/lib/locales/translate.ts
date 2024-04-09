import { t as libTranslate } from 'i18next';

import type EN from './en.json';

export const t = (key: keyof typeof EN) => libTranslate(key);
