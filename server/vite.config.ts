import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'node18',
    outDir: 'dist',
    rollupOptions: {
      external: ['@hono/node-server'],
    },
  },
})
