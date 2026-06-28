import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to local network (0.0.0.0) inside Docker
    port: 5173,
    watch: {
      usePolling: true // Enable polling so hot reload triggers on Windows hosts
    }
  }
})
