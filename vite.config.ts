import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
  base: "/alex-evo-sh-ui-kit/",  
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ],
})
