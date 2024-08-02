import { Config } from 'tailwindcss';
import { VendyxTailwindPreset } from './src/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [VendyxTailwindPreset],
  content: ['./src/**/*.{ts,tsx}']
} satisfies Config;
