import { VendyxTailwindPreset } from '@vendyx/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    /**
     * Vendyx theme package is built on top of tailwindcss
     * Vendyx theme is build without tailwind styles to avoid overriding styles
     * So we need to add theme package location in tailwind config
     * this will allow tailwind to scan theme package for styles
     *
     * NOTE: When using theme package as npm package, you will point to node_modules folder
     */
    '../theme/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [VendyxTailwindPreset],
}
