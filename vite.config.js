import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Avertit si un chunk dépasse 500 Ko
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Sépare React et Framer Motion du code applicatif
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer'
          }
        },
      },
    },
  },
})
