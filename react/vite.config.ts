import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: {
        timer: resolve(__dirname, './src/the-cdt.tsx'),
        editor: resolve(__dirname, './src/the-cdt-editor.tsx'),
      }
    }
  }
})
