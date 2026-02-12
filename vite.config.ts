import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "/alex-evo-sh-auth/",  
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib:{
      entry: resolve(__dirname, 'src/index.ts'),
      name: "alex-evo-sh-auth",
      formats: ["es", "umd"],
      fileName: (format)=> `alex-evo-sh-sh-auth.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
