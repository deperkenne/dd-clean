import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** API Spring Boot en local : le proxy évite les problèmes de CORS pendant le développement. */
const API_PROXY = { '/api': { target: 'http://localhost:8080', changeOrigin: true } }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { proxy: API_PROXY },
  preview: { proxy: API_PROXY },
})
