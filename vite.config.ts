import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/mini-todo-list/', // Match your GitHub repo name
  build: {
    outDir: 'dist', // Explicitly set (this is Vite's default)
  }
})
