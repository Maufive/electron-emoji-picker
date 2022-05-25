import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  root: resolve('./src/renderer'),
  build: {
    outDir: resolve('./dist'),
    emptyOutDir: true
  },
  resolve: {
    alias: [
      {
        find: '@/renderer',
        replacement: resolve(__dirname, 'src/renderer')
      },
      {
        find: '@/common',
        replacement: resolve(__dirname, 'src/common')
      }
    ]
  }
})
