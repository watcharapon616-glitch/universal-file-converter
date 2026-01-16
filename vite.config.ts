import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // เปลี่ยนจาก '/universal-file-converter/' เป็นแค่ '/' ตัวเดียว
})