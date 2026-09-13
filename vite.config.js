import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const port = Number(process.env.PORT) || 5173
const allowedHosts = ['at-7beh.onrender.com', 'aditya-travels.onrender.com']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port,
    allowedHosts,
  },
  preview: {
    host: '0.0.0.0',
    port,
    allowedHosts,
  },
})
