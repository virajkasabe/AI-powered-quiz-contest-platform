import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()]
=======
  plugins: [
    react(),
    tailwindcss(),
  ],
>>>>>>> 2bd4b160f1bb4f94efd7f621f13076340e6201d0
})
