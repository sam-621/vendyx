import { EblocTailwindPreset } from '@ebloc/theme';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    /**
     * Ebloc theme package is built on top of tailwindcss
     * Ebloc theme is build without tailwind styles to avoid overriding styles
     * So we need to add theme package location in tailwind config
     * this will allow tailwind to scan theme package for styles
     *
     * NOTE: When using theme package as npm package, you will point to node_modules folder
     */
    '../theme/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      geist: ['Geist Sans', ...fontFamily.sans]
    }
  },
  presets: [EblocTailwindPreset]
};
