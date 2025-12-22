import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hackathon-dec-2025/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
      host: '5173--019b3854-d43b-71fc-bd42-1b84a7f1b05f.eu-central-1-01.gitpod.dev'
    }
  }
})
