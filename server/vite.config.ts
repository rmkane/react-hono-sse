import { defineConfig } from 'vite'
import { resolve } from 'path'

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
