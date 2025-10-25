import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig(() => {
  // Load env variables based on the current mode (development/production)
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/requests': {
          target: 'https://greenwich-ap-backend.onrender.com/api', // ✅ use loaded env
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/requests/, ''),
        },
      },
    },
  }
})
