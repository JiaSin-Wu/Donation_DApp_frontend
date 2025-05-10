import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // 允许使用最新的 JavaScript 特性，包括 BigInt
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // 为依赖项也使用最新的 JavaScript 标准
    },
  }
})