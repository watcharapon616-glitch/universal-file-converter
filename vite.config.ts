import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/universal-file-converter/', // เปลี่ยนตรงนี้ให้เป็นชื่อ repository
  plugins: [react()],
})