# @ebloc/theme

`@ebloc/theme` is a ui library for ebloc admin ui and admin ui extensions, built on top of [TailwindCSS](https://tailwindcss.com/) and [Shadcnshadcn/ui](https://ui.shadcn.com/).

Although ebloc theme is built with react components, also exposes css styles like variables and tailwind classes with `class-variance-authority`, so in case you cannot use react components, you can use the css styles.

## Setup

Ebloc theme exposes react utilities (components, hooks, context), css styles (classes and variables) and typescript function utilities.

### Requirements

[TailwindCSS](https://tailwindcss.com) installed and configured for your framework

### Installation

To install `@ebloc/theme` run the following commands in your terminal

```bash
yarn install @ebloc/theme
```

### Tailwind CSS setup

Ebloc theme is built on top of Tailwind CSS, so you need to have installed and configured tailwind for your framework. Once that is complete, add the following code to your tailwind config

```ts
import { EblocTailwindPreset } from '@ebloc/theme'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [EblocTailwindPreset],
  content: [
    // ...
    /**
     * Ebloc theme package is built on top of tailwindcss
     * Ebloc theme is build without tailwind styles to avoid overriding styles
     * So we need to add theme package location in tailwind config
     * this will allow tailwind to scan theme package for styles
     *
     * NOTE: When using theme package as npm package, you will point to node_modules folder
     */
    '../theme/**/*.{js,ts,jsx,tsx}',
  ],
}
```

### Import CSS file

Import css file into your entry point. This is going to load all our css styles, with this the @ebloc/theme components will have their appropriate styles and our styles will be ready to use by tailwind

```ts
import '@ebloc/theme/dist/style.css'
```

### Import theme provider

Theme provider allows you to have dark and light mode functionality.

```tsx
// 1. Import Theme provider
import { ThemeProvider } from '@ebloc/theme'

function App() {
  // 2. Wrap ThemeProvider at the root of your app
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default App
```

### Usage

```jsx
import { Button } from '@ebloc/theme'

function App() {
  return (
    <>
      // ...
      <Button>Hello World</Button>
    </>
  )
}
```

## Icons

Ebloc theme uses [lucide icons](https://lucide.dev/icons/), if you want to use them in your ui extensions install `lucide-react` package in your project with the following command

```bash
yarn add lucide-react
```
