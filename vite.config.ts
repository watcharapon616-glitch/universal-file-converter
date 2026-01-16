import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // สำคัญมาก: ใช้จุดและสแลช เพื่อให้รองรับการรันบน GitHub Pages
})