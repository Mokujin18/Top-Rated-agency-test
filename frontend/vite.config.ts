import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@app': '/src',
      '@common': '/src/common',
      '@modules': '/src/modules',
      '@core': '/src/core',
    },
  },
  plugins: [vue(), tailwindcss()],
})
