import { Config } from 'tailwindcss';
import { EblocTailwindPreset } from './src/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [EblocTailwindPreset],
  content: ['./src/**/*.{ts,tsx}']
} satisfies Config;
