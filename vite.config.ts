import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'my-pc-builder/', // แก้เป็นแบบนี้ (ไม่มี / ข้างหน้า) เพื่อให้ลิงก์สัมพันธ์กับ GitHub Pages
})