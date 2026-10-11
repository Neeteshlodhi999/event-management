import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    // Keep a real HTML entry for reset links opened from email. This prevents
    // static hosts from returning a 404 before React can render the page.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resetPassword: resolve(__dirname, 'reset-password/index.html'),
      },
    },
  },
});
