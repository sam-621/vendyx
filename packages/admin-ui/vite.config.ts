import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8080
  },
  base: mode === 'production' ? '/admin/' : '/',
  optimizeDeps: {
    include: ['@ebloc/common']
  },
  build: {
    commonjsOptions: {
      include: [/common/, /node_modules/]
    }
  }
}));
