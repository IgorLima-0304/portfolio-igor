import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const isVercel = process.env.VERCEL === '1';
  return {
    base: isVercel ? '/' : (command === 'build' ? '/portfolio-igor/' : '/'),
    plugins: [
      react(),
      tailwindcss(),
    ],
    build: {
    }
  };
});