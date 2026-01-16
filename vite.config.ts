import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ใช้ './' เพื่อให้รองรับทั้งโดเมนส่วนตัวและลิงก์ GitHub
  plugins: [react()],
})