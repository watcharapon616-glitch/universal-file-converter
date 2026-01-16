import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // แก้ไขจุดนี้ครับ
  plugins: [react()],
})