import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailwindcssMotion from 'tailwindcss-motion';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        plugins: [tailwindcssMotion],
      },
    })
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})


