import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/universal-file-converter/', // ต้องมี / ปิดหัวท้ายแบบนี้เป๊ะๆ ครับ
})