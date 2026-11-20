import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // Dev only: the browser talks to localhost, Vite forwards to WordPress.
    // secure:false because the server uses a self-signed certificate.
    proxy: {
      '/wp-json': {
        target: 'https://130.49.153.50',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
