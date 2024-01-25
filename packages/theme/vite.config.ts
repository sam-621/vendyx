import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// vite config for lib mode, generates declaration files, builds for es and umd formats, and exports content from index.ts
export default defineConfig(() => ({
  plugins: [
    react(),
    tsconfigPaths(),
    // Generates declaration files (*.d.ts) from .ts(x) source files
    dts({
      include: ['src/'],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'lib',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
}))
