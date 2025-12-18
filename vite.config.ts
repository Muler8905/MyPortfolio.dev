import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
    ],
    server: {
      historyApiFallback: true,
    },
    // Critical for GitHub Pages: setting base to './' ensures assets are loaded relatively.
    base: './',
    define: {
      // This makes process.env.API_KEY available in the browser code
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // Prevents "process is not defined" error in some browser environments
      'process.env': {}
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    }
  }
})