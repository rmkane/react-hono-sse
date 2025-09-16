import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@hono/node-server'],
    },
    target: 'node18',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
