import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')

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
          target: env.VITE_BACKEND_URL, // ✅ use loaded env
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/requests/, ''),
        },
      },
    },
  }
})
