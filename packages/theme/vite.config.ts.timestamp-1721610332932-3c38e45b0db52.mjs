// vite.config.ts
import { resolve } from "node:path";
import dts from "file:///Users/rogeliosamuelmorenocorrales/dev/me/ebloc/node_modules/vite-plugin-dts/dist/index.mjs";
import { defineConfig } from "file:///Users/rogeliosamuelmorenocorrales/dev/me/ebloc/node_modules/vite/dist/node/index.js";
import react from "file:///Users/rogeliosamuelmorenocorrales/dev/me/ebloc/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/rogeliosamuelmorenocorrales/dev/me/ebloc/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(() => ({
  plugins: [
    react(),
    tsconfigPaths(),
    // Generates declaration files (*.d.ts) from .ts(x) source files
    dts({
      include: ["src/"]
    })
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "lib",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    },
    copyPublicDir: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcm9nZWxpb3NhbXVlbG1vcmVub2NvcnJhbGVzL2Rldi9tZS9lYmxvYy9wYWNrYWdlcy90aGVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3JvZ2VsaW9zYW11ZWxtb3Jlbm9jb3JyYWxlcy9kZXYvbWUvZWJsb2MvcGFja2FnZXMvdGhlbWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3JvZ2VsaW9zYW11ZWxtb3Jlbm9jb3JyYWxlcy9kZXYvbWUvZWJsb2MvcGFja2FnZXMvdGhlbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcblxuLy8gdml0ZSBjb25maWcgZm9yIGxpYiBtb2RlLCBnZW5lcmF0ZXMgZGVjbGFyYXRpb24gZmlsZXMsIGJ1aWxkcyBmb3IgZXMgYW5kIHVtZCBmb3JtYXRzLCBhbmQgZXhwb3J0cyBjb250ZW50IGZyb20gaW5kZXgudHNcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgLy8gR2VuZXJhdGVzIGRlY2xhcmF0aW9uIGZpbGVzICgqLmQudHMpIGZyb20gLnRzKHgpIHNvdXJjZSBmaWxlc1xuICAgIGR0cyh7XG4gICAgICBpbmNsdWRlOiBbJ3NyYy8nXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKCdzcmMnLCAnaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdsaWInLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0L2pzeC1ydW50aW1lJ10sXG4gICAgfSxcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgfSxcbn0pKVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxTQUFTLGVBQWU7QUFDcFksT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUcxQixJQUFPLHNCQUFRLGFBQWEsT0FBTztBQUFBLEVBQ2pDLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQTtBQUFBLElBRWQsSUFBSTtBQUFBLE1BQ0YsU0FBUyxDQUFDLE1BQU07QUFBQSxJQUNsQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLE9BQU8sVUFBVTtBQUFBLE1BQ2hDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLENBQUMsV0FBVyxTQUFTLE1BQU07QUFBQSxJQUN2QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsYUFBYSxtQkFBbUI7QUFBQSxJQUN0RDtBQUFBLElBQ0EsZUFBZTtBQUFBLEVBQ2pCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
