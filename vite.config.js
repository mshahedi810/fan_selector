import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fan_selector/', // دقیقا اسم ریپوی GitHub Pages با / اول و آخر
  optimizeDeps: {
  include: ["@google/generative-ai"]
}
})


