import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-pc-builder/', // ต้องมี / ปิดท้ายแบบนี้เท่านั้น
})