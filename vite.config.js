import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5555
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
    ],
  },
  // Добавьте следующую настройку для поддержки истории маршрутизации
  server: {
    fs: {
      strict: false,
    },
  },
})